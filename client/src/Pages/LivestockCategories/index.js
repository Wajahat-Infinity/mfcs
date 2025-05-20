import React, { useEffect, useRef, useState } from "react";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { InputField } from "../../units/FormUnits";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import Modal from "../../units/Modal";
import CategoryTable from "../../components/CategoryTable";
import ActionButton from "../../units/TableButton";
import {
  createItem,
  deleteItem,
  updateCategory,
  getLivestockCategories,
} from "../../Redux/Actions/LivestockCategories";
import Paper from "../../units/Paper";
import Divider from "../../units/Divider";
import AddDataButton from "../../units/AddDataButton";
import Button from "../../units/Button";
import { useStyles } from "./styles";
import { useTostMessage } from "../../Utilites";
import NotificationModal from "../../units/NotificationModal";

const LivestockCategories = ({
  data,
  totalPages,
  currentPage,
  getLivestockCategories,
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
  const [currentValue, setCurrentValue] = useState({ name: "", id: null });
  const [isModalOpen, handleIsModalOpen] = useState(false);
  const handleModalClose = () => {
    handleIsModalOpen(false);
    setIsCreateNewItem(false);
  };
  const handleModalOpen = ({ categoryName, id }) => {
    setCurrentValue({ name: categoryName, id });
    handleIsModalOpen(true);
  };

  const handleEditSubmit = (payload) => {
    updateCategory(payload);
  };

  const [isCreateNewItem, setIsCreateNewItem] = useState(false);
  const handleCreateItem = (payload) => {
    let fd = new FormData();
    fd.append("categoryName", payload.categoryName);
    createItem(fd);
  };
  const handleAddItem = () => {
    setCurrentValue({ name: "", id: null });
    setIsCreateNewItem(true);
    handleIsModalOpen(true);
  };
  const handleLoadMore = (reload = false) => {
    if (reload) {
      if (currentPage < totalPages) {
        getLivestockCategories({ page: currentPage + 1 });
      }
    } else {
      getLivestockCategories();
    }
  };
  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

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
    deleteItem(currDeleteElement.current.id);
  };

  return (
    <React.Fragment>
      <HeaderTab />
      <SidebarTab>
        <CategoryTable
          columnName={"Total Animals"}
          showLoadMore={currentPage < totalPages}
          loadMoreHandler={() => {
            handleLoadMore(true);
          }}
        >
          {data.map(({ category_id, category_name, total_animals }, index) => (
            <TableRow key={category_id} className={classes.row}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="center">{category_name}</TableCell>
              <TableCell align="center">{total_animals}</TableCell>
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
                  onClick={() => {
                    handleDelete(category_id);
                  }}
                >
                  <DeleteIcon />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </CategoryTable>
        <div className={classes.addButtonContainer}>
          <AddDataButton onClick={handleAddItem}>
            Add New Category
          </AddDataButton>
        </div>
      </SidebarTab>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <EditForm
          value={currentValue}
          handleSubmit={isCreateNewItem ? handleCreateItem : handleEditSubmit}
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
  const { LivestockCategories } = state;

  return {
    ...LivestockCategories,
  };
};

const mapDispatchToProps = {
  createItem,
  deleteItem,
  updateCategory,
  getLivestockCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LivestockCategories);

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
