<Dropdown isOpen={dropdown} toggle={openCloseDropdown}>
                            <DropdownToggle caret>Sign Up</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem >
                                    <Link to={"/registerApplicant"} className="">
                                        Applicant
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to={"/registerPublisher"} className="">
                                        Publisher
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to={"/registerPerson"} className="">
                                        Person
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                            </Dropdown>       