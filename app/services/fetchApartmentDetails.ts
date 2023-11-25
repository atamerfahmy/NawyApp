import fetcher from '../utils/fetcher';

const fetchApartmentDetails = async (id: String) => {
     return await fetcher.get(`/apartments/${id}`);
}

export default fetchApartmentDetails;