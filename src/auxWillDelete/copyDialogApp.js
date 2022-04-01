<Dialog header="JobOffer" visible={jobofferDialog} style={{width: '1000px'}} modal={true} onHide={() => setJobofferDialog(false)}>
        
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="jobId">JobId</label> </div>
                    <div className="field">
                        <InputText id="jobId" value={jobApplied.jobId} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="applied">Applied</label> </div>
                    <div className="field">
                        <InputText id="applied" value={jobApplied.applied} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="deletedDay">DeletedDay</label> </div>
                    <div className="field">
                        <InputText id="deletedDay" value={jobApplied.deletedDay} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="jobAppdeleted">JobAppdeleted</label> </div>
                    <div className="field">
                        <InputText id="jobAppdeleted" value={jobApplied.jobAppdeleted} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="studentid">StudentID</label> </div>
                    <div className="field">
                        <InputText id="studentid" value={jobApplied.studentid} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="name">Name</label> </div>
                    <div className="field">
                        <InputText id="name" value={jobApplied.name} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="surname">Surname</label> </div>
                    <div className="field">
                        <InputText id="surname" value={jobApplied.surname} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="dni">DNI</label> </div>
                    <div className="field">
                        <InputText id="dni" value={jobApplied.dni} style={{width : '100%'}} readOnly />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="email">Email</label> </div>
                    <div className="field">
                        <InputText id="email" value={jobApplied.email} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="phoneNumber">PhoneNumber</label> </div>
                    <div className="field">
                        <InputText id="phoneNumber" value={jobApplied.phoneNumber} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="typeStudent">TypeStudent</label> </div>
                    <div className="field">
                        <InputText id="typeStudent" value={jobApplied.typeStudent} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="title">Title</label> </div>
                    <div className="field">
                        <InputText id="title" value={jobApplied.title} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="description">Description</label> </div>
                    <div className="field">
                        <InputTextarea id="description" value={jobApplied.description} readOnly style={{width : '100%'}} rows={3} cols={80} />
                    </div>
                    <div className="field col"> <label htmlFor="area">Area</label> </div>
                    <div className="field">
                        <InputText id="area" value={jobApplied.area} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="body">Body</label> </div>
                    <div className="field">
                        <InputTextarea id="body" value={jobApplied.body} readOnly style={{width : '100%'}} rows={3} cols={80} />
                    </div>
                    <div className="field col"> <label htmlFor="experience">Experience</label> </div>
                    <div className="field">
                        <InputText id="experience" value={jobApplied.experience} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="modality">Modality</label> </div>
                    <div className="field">
                        <InputText id="modality" value={jobApplied.modality} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="position">Position</label> </div>
                    <div className="field">
                        <InputText id="position" value={jobApplied.position} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="datePublished">DatePublished</label> </div>
                    <div className="field">
                        <InputText id="datePublished" value={jobApplied.datePublished} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="modifiedDay">ModifiedDay</label> </div>
                    <div className="field">
                        <InputText id="modifiedDay" value={jobApplied.modifiedDay} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="jobOfferDeletedDay">JobOfferDeletedDay</label> </div>
                    <div className="field">
                        <InputText id="jobOfferDeletedDay" value={jobApplied.jobOfferDeletedDay} readOnly style={{width : '100%'}} />
                    </div>
                    <div className="field col"> <label htmlFor="jobOfferDeleted">JobOfferDeleted</label> </div>
                    <div className="field">
                        <InputText id="jobOfferDeleted" value={jobApplied.jobOfferDeleted} style={{width : '100%'}} readOnly />
                    </div>
                </div> 
                <div className="formgrid grid">
                    <div className="field col"> <label htmlFor="state">State</label> </div>
                    <div className="field">
                        <InputText id="state" value={jobApplied.state} readOnly style={{width : '100%'}} />
                    </div>
                    
                </div> 
            </Dialog>