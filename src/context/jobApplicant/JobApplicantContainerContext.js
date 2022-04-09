import { position } from "dom-helpers";
import React from "react";
import Context from "./JobApplicantContext";

const emptyJobApplicant = { 
jobOfferApplicantID: '', setJobOfferApplicantID: jobOfferApplicantID => (emptyJobApplicant.jobOfferApplicantID = jobOfferApplicantID),
applied: '', setApplied: applied => (emptyJobApplicant.applied = applied),
deletedDay: '', setDeletedDay: deletedDay => (emptyJobApplicant.deletedDay = deletedDay),
jobAppdeleted: '', setJobAppdeleted: jobAppdeleted => (emptyJobApplicant.jobAppdeleted = jobAppdeleted),
applicantID: '', setApplicantID: applicantID => (emptyJobApplicant.applicantID = applicantID),
name: '', setName: name => (emptyJobApplicant.name = name),
surname: '', setSurname: surname => (emptyJobApplicant.surname = surname),
dni: '', setDni: dni => (emptyJobApplicant.dni = dni),
email: '', setEmail: email => (emptyJobApplicant.email = email),
phoneNumber: '', setPhoneNumber: phoneNumber => (emptyJobApplicant.phoneNumber = phoneNumber),
typeStudent: '', setTypeStudent: typeStudent => (emptyJobApplicant.typeStudent = typeStudent),
jobOfferID: '', setJobOfferID: jobOfferID => (emptyJobApplicant.jobOfferID = jobOfferID),
title: '', setTitle: title => (emptyJobApplicant.title = title),
description: '', setDescription: description => (emptyJobApplicant.description = description),
area: '', setArea: area => (emptyJobApplicant.area = area),
body: '', setBody: body => (emptyJobApplicant.body = body),
experience: '', setExperience: experience => (emptyJobApplicant.experience = experience),
modality: '', setModality: modality => (emptyJobApplicant.modality = modality),
position: '', setPosition: position => (emptyJobApplicant.position = position),
category: '', setCategory: category => (emptyJobApplicant.category = category),
categoryDescription: '', setCategoryDescription: categoryDescription => (emptyJobApplicant.categoryDescription = categoryDescription),
datePublished: '', setDatePublished: datePublished => (emptyJobApplicant.datePublished = datePublished),
modifiedDay: '', setModifiedDay: modifiedDay => (emptyJobApplicant.modifiedDay = modifiedDay),
jobOfferDeletedDay: '', setJobOfferDeletedDay: jobOfferDeletedDay => (emptyJobApplicant.jobOfferDeletedDay = jobOfferDeletedDay),
jobOfferDeleted: '', setJobOfferDeleted: jobOfferDeleted => (emptyJobApplicant.jobOfferDeleted = jobOfferDeleted),
state: '', setState: state => (emptyJobApplicant.state = state)
}; 

const JobApplicantContainerContext = props => (
    <Context.Provider value={emptyJobApplicant}>
      {props.children}
    </Context.Provider>
  );
  
  export default JobApplicantContainerContext;