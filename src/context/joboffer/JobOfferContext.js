import React from "react";

const emptyJobOffer = { 
id: '', setId: () => {},
title: '', setTitle: () => {},
description: '', setDescription: () => {},
area: '', setArea: () => {},
body: '', setBody: () => {},
experience: '', setExperience: () => {},
modality: '', setModality: () => {},
position: '', setPosition: () => {},
category: '', setCategory: () => {},
datePublished: '', setDatePublished: () => {},
modifiedDay: '', setModifiedDay: () => {},
deletedDay: '', setDeletedDay: () => {},
deleted: '', setDeleted: () => {},
state: '', setState: () => {},
message: '', setMessage: () => {}
}; 
const JobOfferContext = React.createContext(emptyJobOffer);
export default JobOfferContext;