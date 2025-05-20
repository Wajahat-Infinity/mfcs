import React, { useEffect, useRef, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { InputField } from "../../units/FormUnits";
import Modal from "../../units/Modal";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import DataTable from "../../components/DataTable";
import ActionButton from "../../units/TableButton";
import Button from "../../units/Button";
import Divider from "../../units/Divider";
import Paper from "../../units/Paper";
import {
  deleteItem,
  getInventoryData,
  postInventoryData,
  updateInventoryData,
  getInventoryCategoriesNameList,
} from "../../Redux/Actions/InventoryData";
import { dateFormatter, useTostMessage } from "../../Utilites";
import { useStyles } from "./styles";
import AddDataButton from "../../units/AddDataButton";
import Select from "../../units/Select";
import NotificationModal from "../../units/NotificationModal";

const InventoryData = ({
  data,
  totalPages,
  currentPage,
  deleteItem,
  isDeleting,
  isDeletingFailed,
  deleteMessage,
  getInventoryData,
  postInventoryData,
  isPosting,
  isPostingFailed,
  postMessage,
  updateInventoryData,
  isUpdating,
  isUpdatingFailed,
  updateMessage,
  categoriesList,
  getInventoryCategoriesNameList,
}) => {
  const classes = useStyles();
  useTostMessage(isUpdating, isUpdatingFailed, updateMessage);
  useTostMessage(isDeleting, isDeletingFailed, deleteMessage);
  useTostMessage(isPosting, isPostingFailed, postMessage);

  const [isModalOpen, handleIsModalOpen] = useState(false);
  const [currentValues, setCurrentValues] = useState({
    id: null,
    itemName: "",
    itemPrice: "",
    currency: "",
    purhasedDate: "",

    categoryId: "",
  });
  const handleModalClose = () => {
    handleIsModalOpen(false);
  };
  const handleModalOpen = (
    id,
    itemName,
    categoryId,

    itemPrice,
    currency,
    purhasedDate
  ) => {
    setIsCreateNewItem(false);

    setCurrentValues({
      id,
      itemName,
      itemPrice,
      currency,
      purhasedDate,
      categoryId,
    });
    handleIsModalOpen(true);
  };

  const handleEditSubmit = (payload) => {
    updateInventoryData(payload);
  };

  const [isCreateNewItem, setIsCreateNewItem] = useState(false);
  const handleAddItem = () => {
    setCurrentValues({
      id: null,
      itemName: "",
      itemPrice: "",
      currency: "",
      purhasedDate: "",
      categoryId: "",
    });
    setIsCreateNewItem(true);
    handleIsModalOpen(true);
  };

  const handleCreateItem = (payload) => {
    let fd = new FormData();
    Object.keys(payload).forEach((key) => {
      fd.append(key, payload[key]);
    });
    postInventoryData(fd);
  };

  const handleLoadMore = (reload = false) => {
    if (reload) {
      if (currentPage < totalPages) {
        getInventoryData({ page: currentPage + 1 });
      }
    } else {
      getInventoryData();
    }
  };

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  useEffect(() => {
    getInventoryCategoriesNameList();
  }, [getInventoryCategoriesNameList]);

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
        <DataTable
          showLoadMore={currentPage < totalPages}
          loadMoreHandler={() => {
            handleLoadMore(true);
          }}
        >
          <TableHead>
            <TableRow component="tr">
              <TableCell>Serial No</TableCell>
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Purchased Price</TableCell>
              <TableCell align="center">Purchased Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (
                {
                  category_id,
                  inventory_id,
                  inventory_name,
                  category_name,
                  purhased_price,
                  currency,
                  purhased_date,
                },
                index
              ) => (
                <TableRow key={inventory_id} className={classes.row}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{inventory_name}</TableCell>
                  <TableCell align="center">{category_name}</TableCell>
                  <TableCell align="center">
                    {currency}.&nbsp;{purhased_price}/-
                  </TableCell>

                  <TableCell align="center">
                    {dateFormatter(purhased_date)}
                  </TableCell>

                  <TableCell align="right">
                    <ActionButton
                      edit
                      onClick={() => {
                        handleModalOpen(
                          inventory_id,
                          inventory_name,
                          category_id,
                          purhased_price,
                          currency,
                          purhased_date
                        );
                      }}
                    >
                      <EditIcon />
                    </ActionButton>
                    &nbsp;
                    <ActionButton
                      onClick={() => handleDelete(inventory_id, inventory_name)}
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
            Add New Inventory
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
        Are you sure you want to delete '{currDeleteElement.current.name}'?
      </NotificationModal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { InventoryData } = state;
  return {
    ...InventoryData,
  };
};
const mapDispatchToProps = {
  deleteItem,
  getInventoryData,
  updateInventoryData,
  postInventoryData,
  getInventoryCategoriesNameList,
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryData);

const EditForm = ({
  currentValues,
  handleModalClose,
  categoriesList = [],
  handleSubmit = () => {},
}) => {
  const classes = useStyles();
  const inputValidationSchema = yup.object({
    itemName: yup.string().required("Item name is required."),

    itemPrice: yup
      .number("Price Must be a Number.")
      .required("Price is Required Field"),
    currency: yup
      .string()
      .required("Currency is requried")
      .oneOf(["PKR", "USD", "YEN"]),
    purhasedDate: yup.date().required("Purchase Date is required."),
    categoryId: yup.number().required("Category is Required"),
  });
  const purchateDate = currentValues.purhasedDate || Date.now();

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{
          itemName: currentValues.itemName || "",
          itemPrice: currentValues.itemPrice || "",
          currency: currentValues.currency || "",
          purhasedDate: new Date(purchateDate).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          categoryId: currentValues.categoryId || "",
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
            {currentValues.id ? " Edit Inventory Details" : "Add New Inventory"}
          </Typography>
          <Divider className="divider" />
          <InputField
            placeholder="Item Name"
            className={classes.inputField}
            type="text"
            name="itemName"
          />
          <Select
            label="Category"
            name="categoryId"
            className={classes.inputField}
            listData={categoriesList}
          />

          <InputField
            placeholder="Purchased Price"
            className={classes.inputField}
            type="number"
            name="itemPrice"
          />

          <Select
            label="Currency"
            name="currency"
            className={classes.inputField}
            listData={[
              { key: "PKR", value: "PKR" },
              { key: "USD", value: "USD" },
              { key: "YEN", value: "YEN" },
            ]}
          />

          <InputField
            placeholder="Purchased Date"
            className={classes.inputField}
            type="date"
            name="purhasedDate"
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
