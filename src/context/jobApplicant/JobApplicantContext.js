import React from "react";

const emptyJobApplicant = { jobOfferApplicantID: '', setJobOfferApplicantID: () => {},
applied: '', setApplied: () => {},
deletedDay: '', setDeletedDay:  () => {},
jobAppdeleted: '', setJobAppdeleted: () => {},
applicantID: '', setApplicantID: () => {},
name: '', setName: () => {},
surname: '', setSurname: () => {},
dni: '', setDni: () => {},
email: '', setEmail: () => {},
phoneNumber: '', setPhoneNumber: () => {},
typeStudent: '', setTypeStudent: () => {},
jobOfferID: '', setJobOfferID: () => {},
title: '', setTitle: () => {},
description: '', setDescription: () => {},
area: '', setArea: () => {},
body: '', setBody: () => {},
experience: '', setExperience: () => {},
modality: '', setModality: () => {},
position: '', setPosition: () => {},
category: '', setCategory: () => {},
categoryDescription: '', setCategoryDescription: () => {},
datePublished: '', setDatePublished: () => {},
modifiedDay: '', setModifiedDay: () => {},
jobOfferDeletedDay: '', setJobOfferDeletedDay: () => {},
jobOfferDeleted: '', setJobOfferDeleted: () => {},
state: '', setState: () => {}
}; 
const JobApplicantContext = React.createContext(emptyJobApplicant);
export default JobApplicantContext;