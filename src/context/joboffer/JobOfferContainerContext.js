import { position } from "dom-helpers";
import React from "react";
import Context from "./JobOfferContext";

const emptyJobOffer = { 
id: '', setId: id => (emptyJobOffer.id = id),
title: '', setTitle: title => (emptyJobOffer.title = title),
description: '', setDescription: description => (emptyJobOffer.description = description),
area: '', setArea: area => (emptyJobOffer.area = area),
body: '', setBody: body => (emptyJobOffer.body = body),
experience: '', setExperience: experience => (emptyJobOffer.experience = experience),
modality: '', setModality: modality => (emptyJobOffer.modality = modality),
position: '', setPosition: position => (emptyJobOffer.position = position),
category: '', setCategory: category => (emptyJobOffer.category = category),
datePublished: '', setDatePublished: datePublished => (emptyJobOffer.datePublished = datePublished),
modifiedDay: '', setModifiedDay: modifiedDay => (emptyJobOffer.modifiedDay = modifiedDay),
deletedDay: '', setDeletedDay: jobOfferDeletedDay => (emptyJobOffer.deletedDay = jobOfferDeletedDay),
deleted: '', setDeleted: jobOfferDeleted => (emptyJobOffer.deleted = jobOfferDeleted),
state: '', setState: state => (emptyJobOffer.state = state),
message: '', setMessage: message => (emptyJobOffer.message = message)
}; 

const JobOfferContainerContext = props => (
    <Context.Provider value={emptyJobOffer}>
      {props.children}
    </Context.Provider>
  );
  
  export default JobOfferContainerContext;