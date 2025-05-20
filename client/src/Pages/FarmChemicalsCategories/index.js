import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Form, Formik } from "formik";
import * as yup from "yup";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import Modal from "../../units/Modal";
import CategoryTable from "../../components/CategoryTable";
import ActionButton from "../../units/TableButton";
import { InputField } from "../../units/FormUnits";
import {
  createItem,
  deleteItem,
  getFarmChemicalsCategories,
  updateCategory,
} from "../../Redux/Actions/FarmChemicalsCategories";
import Paper from "../../units/Paper";
import Divider from "../../units/Divider";
import AddDataButton from "../../units/AddDataButton";
import Button from "../../units/Button";
import NotificationModal from "../../units/NotificationModal";
import { useStyles } from "./styles";
import { useTostMessage } from "../../Utilites";

const FarmChemicalsCategories = ({
  data,
  totalPages,
  currentPage,
  getFarmChemicalsCategories,
  updateCategory,
  isUpdating,
  isUpdatingFailed,
  updateMessage,
  deleteItem,
  deleteMessage,
  isDeleting,
  isDeletingFailed,
  createItem,
  postMessage,
  isPosting,
  isPostingFailed,
}) => {
  const classes = useStyles();

  useTostMessage(isUpdating, isUpdatingFailed, updateMessage);
  useTostMessage(isDeleting, isDeletingFailed, deleteMessage);
  useTostMessage(isPosting, isPostingFailed, postMessage);

  const [isModalOpen, handleIsModalOpen] = useState(false);
  const currentValue = useRef({ name: "", id: null });

  const handleModalClose = () => {
    handleIsModalOpen(false);
    isCreateNewItem.current = false;
  };
  const handleModalOpen = ({ categoryName, id }) => {
    currentValue.current = { name: categoryName, id };
    handleIsModalOpen(true);
  };

  const handleEditSubmit = (payload) => {
    updateCategory(payload);
  };

  const isCreateNewItem = useRef(false);
  const handleCreateItem = (payload) => {
    let fd = new FormData();
    fd.append("categoryName", payload.categoryName);
    createItem(fd);
  };

  const handleAddItem = () => {
    currentValue.current = { name: "", id: null };
    isCreateNewItem.current = true;
    handleIsModalOpen(true);
  };

  const handleLoadMore = (reload = false) => {
    if (reload) {
      if (currentPage < totalPages) {
        getFarmChemicalsCategories({ page: currentPage + 1 });
      }
    } else {
      getFarmChemicalsCategories();
    }
  };
  useEffect(() => {
    handleLoadMore();
  }, []);

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
    deleteItem(currDeleteElement.current.id);
  };

  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <CategoryTable
          columnName={"Total Chemicals"}
          showLoadMore={currentPage < totalPages}
          loadMoreHandler={() => {
            handleLoadMore(true);
          }}
        >
          {data.map(
            ({ category_id, category_name, total_chemicals }, index) => (
              <TableRow key={category_id} className={classes.row}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">{category_name}</TableCell>
                <TableCell align="center">{total_chemicals}</TableCell>
                <TableCell align="right">
                  <ActionButton
                    edit
                    onClick={() => {
                      handleModalOpen({
                        categoryName: category_name,
                        id: category_id,
                      });
                    }}
                  >
                    <EditIcon />
                  </ActionButton>
                  &nbsp;
                  <ActionButton
                    onClick={() => handleDelete(category_id, category_name)}
                  >
                    <DeleteIcon />
                  </ActionButton>
                </TableCell>
              </TableRow>
            )
          )}
        </CategoryTable>
        <div className={classes.addButtonContainer}>
          <AddDataButton onClick={handleAddItem}>
            Add New Category
          </AddDataButton>
        </div>
      </SidebarTab>
      <Modal open={isModalOpen}>
        <EditForm
          value={currentValue.current}
          handleSubmit={
            isCreateNewItem.current ? handleCreateItem : handleEditSubmit
          }
          handleModalClose={handleModalClose}
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
  const { FarmChemicalsCategories } = state;
  return {
    ...FarmChemicalsCategories,
  };
};
const mapDispatchToProps = {
  createItem,
  deleteItem,
  getFarmChemicalsCategories,
  updateCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarmChemicalsCategories);

const inputValidationSchema = yup.object({
  categoryName: yup.string().required("Category name cannot be blank."),
});

const EditForm = ({
  value,
  handleSubmit = () => {},
  handleModalClose = () => {},
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{ categoryName: value.name }}
        validationSchema={inputValidationSchema}
        onSubmit={(data) => {
          data = { ...data, id: value.id };
          handleSubmit(data);
          handleModalClose();
        }}
      >
        <Form>
          <Typography variant="h5" className="title">
            {value.id ? " Edit Category Name" : "Create New Category"}
          </Typography>
          <Divider className="divider" />
          <InputField
            placeholder="Category Name"
            className={classes.inputField}
            type="text"
            name="categoryName"
            autoFocus
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
