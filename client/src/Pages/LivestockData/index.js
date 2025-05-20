import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputField } from "../../units/FormUnits";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import DataTable from "../../components/DataTable";
import ActionButton from "../../units/TableButton";
import Button from "../../units/Button";
import Divider from "../../units/Divider";
import Paper from "../../units/Paper";

import {
  getLivestockData,
  deleteLivestock,
  createLivestockData,
  updateLivestockData,
  getLivestockCategoriesNameList,
} from "../../Redux/Actions/LivestockData";
import { dateFormatter, useTostMessage } from "../../Utilites";
import AddDataButton from "../../units/AddDataButton";
import Modal from "../../units/Modal";
import Select from "../../units/Select";
import { useStyles } from "./styles";
import NotificationModal from "../../units/NotificationModal";

const LivestockData = ({
  data,
  totalPages,
  currentPage,
  getLivestockData,
  deleteLivestock,
  deleteMessage,
  isDeleting,
  isDeletingFailed,
  createLivestockData,
  postMessage,
  isPosting,
  isPostingFailed,
  updateLivestockData,
  isUpdating,
  isUpdatingFailed,
  updateMessage,
  categoriesList,
  getLivestockCategoriesNameList,
}) => {
  const classes = useStyles();
  const [currentValues, setCurrentValues] = useState({
    id: null,
    animalName: "",
    animalGender: "",
    breedName: "",
    dob: "",
    categoryId: "",
  });
  const [isCreateNewItem, setIsCreateNewItem] = useState(false);
  const [isModalOpen, handleIsModalOpen] = useState(false);
  const handleModalClose = () => {
    handleIsModalOpen(false);
  };
  const handleModalOpen = (
    id,
    animalName,
    animalGender,
    breedName,
    dob,
    categoryId
  ) => {
    setIsCreateNewItem(false);

    setCurrentValues({
      id,
      animalName,
      animalGender,
      breedName,
      dob,
      categoryId,
    });
    handleIsModalOpen(true);
  };

  const handleAddItem = () => {
    setCurrentValues({
      id: null,
      animalName: "",
      animalGender: "",
      breedName: "",
      dob: "",
      categoryId: "",
    });
    setIsCreateNewItem(true);
    handleIsModalOpen(true);
  };

  const handleEditSubmit = (payload) => {
    updateLivestockData(payload);
  };

  const handleCreateItem = (payload) => {
    let fd = new FormData();
    Object.keys(payload).forEach((key) => {
      fd.append(key, payload[key]);
    });
    createLivestockData(fd);
  };

  const handleLoadMore = useCallback((reload = false) => {
    if (reload) {
      if (currentPage < totalPages) {
        getLivestockData({ page: currentPage + 1 });
      }
    } else {
      getLivestockData();
    }
  }, [currentPage, totalPages, getLivestockData]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  useEffect(() => {
    getLivestockCategoriesNameList();
  }, [getLivestockCategoriesNameList]);

  useTostMessage(isUpdating, isUpdatingFailed, updateMessage);
  useTostMessage(isDeleting, isDeletingFailed, deleteMessage);
  useTostMessage(isPosting, isPostingFailed, postMessage);

  const currDeleteElement = useRef({
    id: null,
    name: null,
  });
  useEffect(() => {
    if (!isDeleting && !isDeletingFailed && deleteMessage)
      handleDelteModalClose();
  }, [isDeleting, isDeletingFailed, deleteMessage]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDelteModalClose = () => {
    setIsDeleteModalOpen(false);
    currDeleteElement.current = { id: null, name: null };
  };
  const handleDelete = (id, name) => {
    handleDelteModalOpen();
    currDeleteElement.current = { id, name };
  };
  const handleConfirmDelete = async () => {
    deleteLivestock(currDeleteElement.current.id);
  };
  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <DataTable
          showLoadMore={currentPage < totalPages}
          loadMoreHandler={() => {
            handleLoadMore(true);
          }}
        >
          <TableHead>
            <TableRow component="tr">
              <TableCell>Serial No</TableCell>
              <TableCell align="center">Animal ID/Name</TableCell>
              <TableCell align="center">Animal Gender</TableCell>
              <TableCell align="center">Animal Breed</TableCell>
              <TableCell align="center">Birth Date</TableCell>

              <TableCell align="center">Category</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (
                {
                  livestock_id,
                  livestock_name,
                  livestock_gender,
                  breed_name,
                  date_of_birth,
                  category_name,
                  category_id,
                },
                index
              ) => (
                <TableRow key={livestock_id} className={classes.row}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{livestock_name}</TableCell>
                  <TableCell align="center">{livestock_gender}</TableCell>
                  <TableCell align="center">{breed_name}</TableCell>
                  <TableCell align="center">
                    {dateFormatter(date_of_birth)}
                  </TableCell>
                  <TableCell align="center">{category_name}</TableCell>

                  <TableCell align="right">
                    <ActionButton
                      edit
                      onClick={() => {
                        handleModalOpen(
                          livestock_id,
                          livestock_name,
                          livestock_gender,
                          breed_name,
                          date_of_birth,
                          category_id
                        );
                      }}
                    >
                      <EditIcon />
                    </ActionButton>
                    &nbsp;
                    <ActionButton
                      onClick={() => handleDelete(livestock_id, livestock_name)}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </DataTable>
        <div className={classes.addButtonContainer}>
          <AddDataButton onClick={handleAddItem}>
            Add New Livestock
          </AddDataButton>
        </div>
      </SidebarTab>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <EditForm
          handleModalClose={handleModalClose}
          handleSubmit={isCreateNewItem ? handleCreateItem : handleEditSubmit}
          currentValues={currentValues}
          categoriesList={categoriesList}
        />
      </Modal>
      <NotificationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDelteModalClose}
        handleConfirm={handleConfirmDelete}
      >
        Are you sure you want to delete category '
        {currDeleteElement.current.name}'?
      </NotificationModal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { LivestockData } = state;
  return {
    ...LivestockData,
  };
};

const mapDispatchToProps = {
  getLivestockData,
  deleteLivestock,
  createLivestockData,
  updateLivestockData,
  getLivestockCategoriesNameList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LivestockData);

const EditForm = ({
  currentValues,
  handleModalClose,
  categoriesList = [],
  handleSubmit = () => {},
}) => {
  const classes = useStyles();
  const inputValidationSchema = yup.object({
    animalName: yup.string().required("Animal name is required."),
    animalGender: yup
      .string()
      .oneOf(["Male", "Female", "Other"])
      .required("Animal Gender is required."),
    breedName: yup.string().required("Breed Name is required."),
    animalCategory: yup.number().required("Category is required."),
    birthDate: yup.date().required("Birth Date is required."),
  });
  const purchateDate = currentValues.dob || Date.now();

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{
          animalName: currentValues.animalName || "",
          animalGender: currentValues.animalGender || "",
          breedName: currentValues.breedName || "",
          birthDate: new Date(purchateDate).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          animalCategory: currentValues.categoryId || "",
        }}
        validationSchema={inputValidationSchema}
        onSubmit={(data) => {
          data = { ...data, id: currentValues.id };
          handleSubmit(data);
          handleModalClose();
        }}
      >
        <Form>
          <Typography variant="h5" className="title">
            {currentValues.id ? " Edit Livestock Details" : "Add New Livestock"}
          </Typography>
          <Divider className="divider" />
          <InputField
            placeholder="Animal ID/Name"
            className={classes.inputField}
            type="text"
            name="animalName"
          />

          <Select
            label="Animal Gender"
            name="animalGender"
            className={classes.inputField}
            listData={[
              { key: "Male", value: "Male" },
              { key: "Female", value: "Female" },
              { key: "Other", value: "Other" },
            ]}
          />
          <InputField
            placeholder="Breed Name"
            className={classes.inputField}
            type="text"
            name="breedName"
          />

          <Select
            label="Category"
            name="animalCategory"
            className={classes.inputField}
            listData={categoriesList}
          />

          <InputField
            placeholder="Birth Date"
            className={classes.inputField}
            type="date"
            name="birthDate"
          />

          <div className={classes.buttons}>
            <Button className="success" type="submit">
              Confrim
            </Button>
            &nbsp;
            <Button onClick={handleModalClose}>Cancel</Button>
          </div>
        </Form>
      </Formik>
    </Paper>
  );
};
