import fetcher from '../utils/fetcher';

const getAllApartments = async () => {
     return await fetcher.get('/apartments');
}

export default getAllApartments;