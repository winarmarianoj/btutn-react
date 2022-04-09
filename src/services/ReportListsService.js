import axios from 'axios';
import AuthService from './AuthService';

const REPORT_LISTS_BASE_URL = "http://localhost:8082/report-lists/";

class ReportListsService{

    /**
     * Devuelve la lista de Todos los JobOffer Con Page.
     * @returns Todos los JobOffer Con Page.
     */
     async getAllWithPage(){
        let user = AuthService.getCurrentUser();
        return await axios.get(REPORT_LISTS_BASE_URL + "with-page").then(res => res.data);
    }

    /**
     * UTN: envia el estado de la publicaciones como filtro
     * @returns lista de postulaciones
     */
     async getJobOfferAllWithFilter(state){
        let user = AuthService.getCurrentUser();
        return await axios.get(REPORT_LISTS_BASE_URL + "filter/" + state).then(res => res.data);
    }
    
    /**
     * APPLICANT: Lo usa el applicante para ver su lista de postulaciones.
     * El ID que se recibe es el del Applicant quien consulta.
     * @returns lista de postulaciones
     */
    async getJobApplicantAllByApplicant(){
        let user = AuthService.getCurrentUser();
        return await axios.get(REPORT_LISTS_BASE_URL + "jobapplicants/" + user.id).then(res => res.data);
    }

    /**
     * PUBLISHER: Lo usa el publicador para ver quien se aplico en cada aviso.
     * El Id es el del aviso a consultar
     * @returns lista de postulaciones en su aviso publicado
     */
    async getJobApplicantAllByJobOfferSimplePublisher(jobofferID){
        return await axios.get(REPORT_LISTS_BASE_URL + "jobapplicants-by-my-offers/" + jobofferID).then(res => res.data);
    }

    /**
     * UTN: Evaluacion de cada aviso antes de ser publicado.
     * Objeto a enviar: JobOfferEvaluationDTO
     * @returns resultado
     */
     async getJobOfferAllEvaluation(jobOfferEvaluationDTO){
        return await axios.post(REPORT_LISTS_BASE_URL + "evaluation", jobOfferEvaluationDTO).then(res => res.data);
    }

    /**
     * PUBLISHER: Ver todos sus avisos. El ID del publicador
     * @returns lista de joboffers propios
     */
    async getJobOfferAllByPublisher(){
        let user = AuthService.getCurrentUser();
        return await axios.get(REPORT_LISTS_BASE_URL + "publisher/" + user.id).then(res => res.data);
    }

    /**
     * PUBLISHER: Ver sus avisos por algun filtro de Categoria. El ID del publicador
     * @returns lista de joboffers propios
     */
     async getJobOfferAllSimplePublisher(category){
        let user = AuthService.getCurrentUser();
        return await axios.get(REPORT_LISTS_BASE_URL + "publisher/filter/" + category + "/" + user.id).then(res => res.data);
    }

}

export default new ReportListsService()