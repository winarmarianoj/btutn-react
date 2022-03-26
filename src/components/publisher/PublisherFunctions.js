import JobOfferService from "../../services/JobOfferService";

class PublisherFunctions{

    peticionGet=(jobOffers)=>{
        setTimeout(() => {
          JobOfferService.getAllJobOfferByPublisher().then(response=>{
            jobOffers = response;
          }).catch(error=>{
            console.log(error.message);
          })        
        }, 1000);
        return jobOffers;
    }
      
      peticionPost=async(states)=>{
        const [id, title, description, area, body, experience, modality, position, category, 
            datePublished, modifiedDay, deletedDay, deleted, state, message] = states.joboffer;
        const [joboffers] = states.jobOffers;
        const [modal] = states.modalInsertar;
        //delete id;
        JobOfferService.create(state.joboffer).then(response=>{
          this.modalInsertar(modal);
          this.peticionGet(joboffers);
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
      peticionPut=(states)=>{
        const [id, title, description, area, body, experience, modality, position, category, 
            datePublished, modifiedDay, deletedDay, deleted, state, message] = states.joboffer;
        const [joboffers] = states.jobOffers;
        const [modal] = states.modalInsertar;
        JobOfferService.update(id, state.joboffer).then(response=>{
          this.modalInsertar(modal);
          this.peticionGet(joboffers);
        })
      }
      
      peticionDelete=(states)=>{
        const [id, title, description, area, body, experience, modality, position, category, 
            datePublished, modifiedDay, deletedDay, deleted, state, message] = states.joboffer;
        const [joboffers] = states.jobOffers;
        const [modal] = states.modalInsertar;
        JobOfferService.delete(id).then(response=>{
          this.setState({modalEliminar: false});
          this.peticionGet(joboffers);
        })
      }
      
      modalInsertar=(modal)=>{
        return  !modal;
      }
}

export default new PublisherFunctions()