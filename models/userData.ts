import config from '../config/config.json';
import storage from "./storage";

const userData = {
    getData: async function getData(){
        console.log("------| Get Data |------");
        const getToken = await storage.readToken();

        const response = await fetch(`${config.authWeb}/data?api_key=${config.api_key}`,
        {
            method:"GET",
            headers: {
                'content-type': 'application/json',
                'x-access-token': getToken.token
            }
        });
        const result = await response.json();

        return result.data;
    },

    createData: async function createData(artefact:string){
        console.log("------| Create Data |------");
        const getToken = await storage.readToken();
        const data = {
            artefact: artefact,
            api_key: config.api_key,
        };

        const respons = await fetch(`${config.authWeb}/data`,
        {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': getToken.token
            }
        });
    },

    updateData: async function updateData(id:number, artefact:string){
        console.log("------| Update Data |------");
        const getToken = await storage.readToken();
        const data = {
            id: id,
            artefact: artefact,
            api_key: config.api_key,
        };

        const respons = await fetch(`${config.authWeb}/data`,
        {
            method:"PUT",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': getToken.token
            }
        });
    },

    deleteData: async function deleteData(id:number){
        console.log("------| Delete  Data |------");
        const getToken = await storage.readToken();
        const data = {
            id: id,
            api_key: config.api_key,
        };

        const respons = await fetch(`${config.authWeb}/data`,
        {
            method:"DELETE",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': getToken.token
            }
        });
    },
}

export default userData;