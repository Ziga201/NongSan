import axios from 'axios';

class Decentralization {
    create(formData) {
        const url = 'https://localhost:7211/api/Product/AddProduct';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    }
    update(formData) {
        const url = 'https://localhost:7211/api/Product/UpdateProduct';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return axios.put(url, formData, config);
    }
    delete(id) {
        const url = 'https://localhost:7211/api/Product/DeleteProduct/' + id;
        return axios.delete(url);
    }

    getAll(pageSize, pageNumber) {
        const url = `https://localhost:7211/api/Product/GetProduct?PageSize=${pageSize}&PageNumber=${pageNumber}`;
        return axios.get(url);
    }
    getProductByID(id) {
        const url = 'https://localhost:7211/api/Product/GetProductByID/' + id;
        return axios.get(url);
    }
}

export default new Decentralization();
