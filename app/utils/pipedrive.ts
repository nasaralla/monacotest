const pipedrive_base_url = 'https://api.pipedrive.com/v1';
const pipedrive_key = '5f1a214cccc91d1db8e565d8be22fbbd9691584b'

interface FieldItem {
    id: number,
    key: string,
    name: string
};

const getDeal = async (id: number) => {
    const response = await fetch(`${pipedrive_base_url}/deals/${id}`, {
        headers: {
            'x-api-token': pipedrive_key,
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data;
};

export const getDealInfo = async (id: number) => {
    const deal_data = await getDeal(id);
    const deal_field_ids = await getDealFields();
    let prompt_info = `Summarize the case with the given details below:`;
    deal_field_ids.forEach((field: FieldItem) => {
        prompt_info = `${prompt_info}\n${field.name}: ${deal_data['data'][field.key]}`;
    });
    console.log(prompt_info);
    return prompt_info;
}

const getDealFields = async () => {
    
    const response = await fetch(`${pipedrive_base_url}/dealFields?start=0&limit=1000`, {
        headers: {
            'x-api-token': pipedrive_key,
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    const wanted_fields = ['Description of case', 'Statements Selected', 'Discrimination Issues', 'Employment Issues'];
    const fields: FieldItem[] = [];
    data['data'].forEach((item: FieldItem) => {
        if (wanted_fields.includes(item.name)) {
            fields.push(item);
        }
    });        
    return fields;
}
