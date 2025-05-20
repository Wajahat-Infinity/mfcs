import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
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
import { InputField } from "../../units/FormUnits";
import HeaderTab from "../../units/Tabs/HeaderTab";
import SidebarTab from "../../units/Tabs/SidebarTab";
import Modal from "../../units/Modal";
import DataTable from "../../components/DataTable";
import ActionButton from "../../units/TableButton";
import Button from "../../units/Button";
import Divider from "../../units/Divider";
import Paper from "../../units/Paper";
import {
  getFarmChemicalsData,
  createFarmchemicals,
  deleteFarmchemical,
  updateFarmchemicals,
  getChemicalCategoriesNameList,
} from "../../Redux/Actions/FarmChemicalsData";
import AddDataButton from "../../units/AddDataButton";
import Select from "../../units/Select";
import NotificationModal from "../../units/NotificationModal";
import { useStyles } from "./styles";
import { dateFormatter, useTostMessage } from "../../Utilites";

const FarmChemicalsData = ({
  data,
  totalPages,
  currentPage,
  getFarmChemicalsData,
  createFarmchemicals,
  isPosting,
  isPostingFailed,
  postMessage,
  deleteFarmchemical,
  isDeleting,
  isDeletingFailed,
  deleteMessage,
  updateFarmchemicals,
  isUpdating,
  isUpdatingFailed,
  updateMessage,
  categoriesList,
  getChemicalCategoriesNameList,
}) => {
  const classes = useStyles();
  useTostMessage(isUpdating, isUpdatingFailed, updateMessage);
  useTostMessage(isDeleting, isDeletingFailed, deleteMessage);
  useTostMessage(isPosting, isPostingFailed, postMessage);

  const [isCreateNewItem, setIsCreateNewItem] = useState(false);
  const [currentValues, setCurrentValues] = useState({
    id: null,
    chemicalName: "",
    categoryId: "",
    quantity: "",
    unit: "",
    price: "",
    currency: "",
    purchasedDate: "",
    expiryDate: "",
  });
  const [isModalOpen, handleIsModalOpen] = useState(false);

  const handleModalClose = () => {
    handleIsModalOpen(false);
  };
  const handleModalOpen = (
    id,
    chemicalName,
    categoryId,
    quantity,
    unit,
    price,
    currency,
    purchasedDate,
    expiryDate
  ) => {
    setIsCreateNewItem(false);

    setCurrentValues({
      id,
      chemicalName,
      categoryId,
      quantity,
      unit,
      price,
      currency,
      purchasedDate,
      expiryDate,
    });
    handleIsModalOpen(true);
  };

  const handleEditSubmit = (payload) => {
    updateFarmchemicals(payload);
  };

  const handleAddItem = () => {
    setCurrentValues({
      id: null,
      chemicalName: "",
      categoryId: "",
      quantity: "",
      unit: "",
      price: "",
      currency: "",
      purchasedDate: "",
      expiryDate: "",
    });
    setIsCreateNewItem(true);
    handleIsModalOpen(true);
  };

  const handleCreateItem = (payload) => {
    let fd = new FormData();
    Object.keys(payload).forEach((key) => {
      fd.append(key, payload[key]);
    });
    createFarmchemicals(fd);
  };

  const handleLoadMore = (reload = false) => {
    if (reload) {
      if (currentPage < totalPages) {
        getFarmChemicalsData({ page: currentPage + 1 });
      }
    } else {
      getFarmChemicalsData();
    }
  };

  useEffect(() => {
    handleLoadMore();
  }, []);

  useEffect(() => {
    getChemicalCategoriesNameList();
  }, [getChemicalCategoriesNameList]);

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
    deleteFarmchemical(currDeleteElement.current.id);
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
              <TableCell align="center">Chemical Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Purchased Date</TableCell>
              <TableCell align="center">Expiry Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (
                {
                  category_id,
                  chemical_id,
                  chemical_name,
                  category_name,
                  quantity,
                  unit,
                  price,
                  purchase_date,
                  expiry_date,
                  currency,
                },
                index
              ) => (
                <TableRow key={index} className={classes.row}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{chemical_name}</TableCell>
                  <TableCell align="center">{category_name}</TableCell>
                  <TableCell align="center">
                    {quantity}&nbsp;{unit}
                  </TableCell>
                  <TableCell align="center">
                    {currency}.&nbsp;{price}/{unit}
                  </TableCell>
                  <TableCell align="center">
                    {dateFormatter(purchase_date)}
                  </TableCell>
                  <TableCell align="center">
                    {dateFormatter(expiry_date)}
                  </TableCell>
                  <TableCell align="right">
                    <ActionButton
                      edit
                      onClick={() => {
                        handleModalOpen(
                          chemical_id,
                          chemical_name,
                          category_id,
                          quantity,
                          unit,
                          price,
                          currency,
                          purchase_date,
                          expiry_date
                        );
                      }}
                    >
                      <EditIcon />
                    </ActionButton>
                    &nbsp;
                    <ActionButton
                      onClick={() => {
                        handleDelete(chemical_id, chemical_name);
                      }}
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
            Add New Chemical
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
  const { FarmChemicalsData } = state;
  return {
    ...FarmChemicalsData,
  };
};
const mapDispatchToProps = {
  getFarmChemicalsData,
  createFarmchemicals,
  deleteFarmchemical,
  updateFarmchemicals,
  getChemicalCategoriesNameList,
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmChemicalsData);

const EditForm = ({
  currentValues,
  handleModalClose,
  categoriesList = [],
  handleSubmit = () => {},
}) => {
  const classes = useStyles();
  const inputValidationSchema = yup.object({
    chemicalName: yup.string().required("Chemical name is required."),
    categoryId: yup.number().required("Category is Required"),
    quantity: yup
      .number("Quantity Must be a Number.")
      .required("Quantity is Required Field"),
    unit: yup.string().required().oneOf(["kg", "mm", "ml"]),

    price: yup
      .number("Price Must be a Number.")
      .required("Price is Required Field"),
    currency: yup
      .string()
      .required("Currency is requried")
      .oneOf(["PKR", "USD", "YEN"]),
    purchasedDate: yup.date().required("Purchase Date is required."),
    expiryDate: yup.date().required("Expiry Date is required."),
  });
  const purchasedDate = currentValues.purchasedDate || Date.now(),
    expiryDate = currentValues.expiryDate || Date.now();
  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={{
          chemicalName: currentValues.chemicalName || "",
          categoryId: currentValues.categoryId || "",
          quantity: currentValues.quantity || "",
          unit: currentValues.unit || "",
          price: currentValues.price || "",
          currency: currentValues.currency || "",
          purchasedDate: new Date(purchasedDate).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          expiryDate: new Date(expiryDate).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
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
            {currentValues.id ? " Edit Chemical Details" : "Add New Chemical"}
          </Typography>
          <Divider className="divider" />
          <Grid container className={classes.formGroup}>
            <Grid item sm={6} xs={12}>
              <InputField
                placeholder="Chemical Name"
                className={classes.inputField}
                type="text"
                name="chemicalName"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Select
                label="Category"
                name="categoryId"
                className={classes.inputField}
                listData={categoriesList}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.formGroup}>
            <Grid item sm={6} xs={12}>
              <InputField
                placeholder="Quantity"
                className={classes.inputField}
                type="number"
                name="quantity"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Select
                label="Unit"
                name="unit"
                className={classes.inputField}
                listData={[
                  { key: "kg", value: "kg" },
                  { key: "mm", value: "mm" },
                  { key: "ml", value: "ml" },
                ]}
              />
            </Grid>
          </Grid>

          <Grid container className={classes.formGroup}>
            <Grid item sm={6} xs={12}>
              <InputField
                placeholder="Price/Unit"
                className={classes.inputField}
                type="number"
                name="price"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
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
            </Grid>
          </Grid>

          <Grid container className={classes.formGroup}>
            <Grid item sm={6} xs={12}>
              <InputField
                placeholder="Purchased Date"
                className={classes.inputField}
                type="date"
                name="purchasedDate"
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <InputField
                placeholder="Expiry Date"
                className={classes.inputField}
                type="date"
                name="expiryDate"
              />
            </Grid>
          </Grid>

          <Grid container className={classes.formGroup}>
            <Grid item xs={12} className={classes.buttons}>
              <Button className="success" type="submit">
                Confrim
              </Button>
              &nbsp;
              <Button onClick={handleModalClose}>Cancel</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Paper>
  );
};
