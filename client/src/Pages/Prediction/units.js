import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ProgressButton } from "../../units/Button";
import { InputField } from "../../units/FormUnits";
import Select from "../../units/Select";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import {
  suggestCrops,
  suggestFertilier,
} from "../../Redux/Actions/Predictions";
import Divider from "../../units/Divider";
import Cities from "./cities";
import { useStyles } from "./styles";
import Paper from "../../units/Paper";
import { withStyles } from "@material-ui/styles";
import { dateFormatter } from "../../Utilites";
import list from "./list";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export const CropsSuggestionsForm = () => {
  const classes = useStyles();

  const validationSchema = yup.object({
    nitrogen: yup
      .number()
      .min(0, "Nitrogen cannot be below 0")
      .required("Nitrogen is required."),
    phosphorous: yup
      .number()
      .min(0, "Phosphorous cannot be below 0")
      .required("Phosphorous name is required."),
    potassium: yup
      .number()
      .min(0, "Potassium cannot be below 0")
      .required("Potassium name is required."),
    pH: yup
      .number()
      .min(0, "pH cannot be below 0")
      .max(14, "pH cannot be above 14")
      .required("pH is required."),

    rainfall: yup
      .number()
      .min(0, "rainfall cannot be below 0")
      .required("Rainfall is required"),

    city: yup.string("").required("City is required"),
  });

  // to be changed
  const {
    Predictions: {
      isPredictingCrop,
      isPredictingCropFailed,
      isPredictingCropSuccess,
      cropMessage,
      cropResults,
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <Typography variant="h6" className="sub-title">
        get suitable crop suggestion based on soil quality
      </Typography>
      <Typography
        style={{ marginBottom: 10 }}
        variant="subtitle1"
        color="primary"
      >
        <em>
          <b>NOTE:</b>
        </em>
        &nbsp; The values of potassium, nitrogen and phosphorous are ratio of
        content in soil.
      </Typography>

      <Divider style={{ marginBottom: 25 }} />
      <Formik
        initialValues={{
          nitrogen: "",
          phosphorous: "",
          potassium: "",
          pH: "",
          rainfall: "",
          city: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await dispatch(suggestCrops(data));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <PageForm cropForm />

            <div className={classes.submitButtonContainer}>
              <ProgressButton
                fullWidth
                disabled={isSubmitting}
                className={classes.signupButton}
                type="submit"
                loading={isSubmitting}
              >
                Suggest Crop
              </ProgressButton>
            </div>
          </Form>
        )}
      </Formik>
      <div className={classes.divider} />

      <Divider />
      <div className={classes.divider} />

      <div className={classes.containerInner}>
        {isPredictingCrop && (
          <div className={classes.loaderContainer}>
            <CircularProgress />
            <Typography className="text">Please wait for results</Typography>
          </div>
        )}

        {isPredictingCropSuccess && (
          <>
            <Typography gutterBottom variant="h5" className="text">
              Suggestions
            </Typography>
            <ResultsTable {...cropResults} />
          </>
        )}
        {isPredictingCropFailed && (
          <Typography className="error">{cropMessage}</Typography>
        )}
      </div>
    </div>
  );
};

const InnerCell = withStyles((theme) => ({
  root: {
    borderBottom: "none",
    paddingBottom: 10,
  },
}))(TableCell);

const ResultsTable = ({
  created_at,
  city,
  avgTemp,
  nitrogen,
  pH,
  phosphorous,
  potassium,
  rainfall,
  suggestCrop,
}) => {
  const handleDownalodPdf =
    (
      nitrogen,
      phosphorous,
      potassium,
      ph,
      avgTemp,
      rainfall,
      city,
      date,
      crop
    ) =>
    () => {
      const doc = new jsPDF();

      doc.setFontSize(15);
      doc.text("Crop Suggestion", 15, 10);

      doc.autoTable({
        head: [
          [
            "Nitrogen",
            "Phosphorous",
            "Potassium",
            "pH Level",
            "Rainfall(mm)",
            "Avg Temp (°C)",
            "City",
            "Result",
          ],
        ],
        body: [
          [
            nitrogen,
            phosphorous,
            potassium,
            ph,
            rainfall,
            avgTemp,
            getCityName(city)[0]?.city,
            crop,
          ],
        ],
      });

      doc.setFontSize(12);
      doc.text(
        `Note: The values of potassium, nitrogen and phosphorous are ratio of content in soil.`,
        15,
        40
      );
      doc.text(`The report has been generated at ${Date()}.`, 15, 46);

      doc.save(`report-${new Date().toLocaleString()}.pdf`);
    };
  return (
    <>
      <TableContainer component={Paper}>
        <Table id="my-table" aria-label="a dense table">
          <TableHead>
            <TableRow component="tr">
              <TableCell align="left">
                <Typography noWrap className="text">
                  Nitrogen
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography noWrap className="text">
                  Phosphorous
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography noWrap className="text">
                  Potassium
                </Typography>
              </TableCell>

              <TableCell align="left">
                <Typography noWrap className="text">
                  pH Level
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography noWrap className="text">
                  Rainfall(mm)
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography title="average temperature" noWrap className="text">
                  Avg Temp(&deg;C)
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography noWrap className="text">
                  City
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography noWrap className="text">
                  Date
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography noWrap className="text">
                  Result
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow component="td">
              <InnerCell align="left">
                <Typography noWrap className="text">
                  {nitrogen}
                </Typography>
              </InnerCell>
              <InnerCell align="left">
                <Typography noWrap className="text">
                  {phosphorous}
                </Typography>
              </InnerCell>
              <InnerCell align="left">
                <Typography noWrap className="text">
                  {potassium}
                </Typography>
              </InnerCell>

              <InnerCell align="left">
                <Typography noWrap className="text">
                  {pH}
                </Typography>
              </InnerCell>
              <InnerCell align="left">
                <Typography noWrap className="text">
                  {rainfall}(mm)
                </Typography>
              </InnerCell>
              <InnerCell align="left">
                <Typography noWrap className="text">
                  {Number(avgTemp).toFixed(2)}&deg;C
                </Typography>
              </InnerCell>
              <InnerCell align="left">
                <Typography noWrap className="text">
                  {getCityName(city)[0]?.city}
                </Typography>
              </InnerCell>
              <InnerCell align="right">
                <Typography noWrap className="text">
                  {dateFormatter(created_at)}
                </Typography>
              </InnerCell>

              <InnerCell align="right">
                <Typography noWrap className="text">
                  {suggestCrop}
                </Typography>
              </InnerCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <span
          onClick={handleDownalodPdf(
            nitrogen,
            phosphorous,
            potassium,
            pH,
            Number(avgTemp).toFixed(2),
            rainfall,
            city,
            created_at,
            suggestCrop
          )}
        >
          <Typography
            noWrap
            className="text"
            variant="h6"
            style={{ display: "flex", alignItems: "center" }}
          >
            Save&nbsp;
            <div style={{ display: "flex", alignItems: "center" }}>
              <SaveAltIcon />
            </div>
          </Typography>
        </span>
      </Box>
    </>
  );
};

const listData = [
  "rice",
  "maize",
  "chickpea",
  "kidneybeans",
  "pigeonpeas",
  "mothbeans",
  "mungbean",
  "blackgram",
  "lentil",
  "pomegranate",
  "banana",
  "mango",
  "grapes",
  "watermelon",
  "muskmelon",
  "apple",
  "orange",
  "papaya",
  "coconut",
  "cotton",
  "jute",
  "coffee",
];

export const FertilizerSuggestionsForm = () => {
  const classes = useStyles();

  const validationSchema = yup.object({
    nitrogen: yup
      .number()
      .min(0, "Nitrogen cannot be below 0")
      .required("Nitrogen is required."),
    phosphorous: yup
      .number()
      .min(0, "Phosphorous cannot be below 0")
      .required("Phosphorous name is required."),
    potassium: yup
      .number()
      .min(0, "Potassium cannot be below 0")
      .required("Potassium name is required."),
    pH: yup
      .number()
      .min(0, "pH cannot be below 0")
      .max(14, "pH cannot be above 14")
      .required("pH is required."),

    crop: yup.string().required("Crop name is required"),
  });

  const {
    Predictions: {
      isPredictingFertlizer,
      isPredictingFertlizerFailed,
      isPredictingFertlizerSuccess,
      fertilizerMessage,
      data: { result, nitrogen, phosphorous, potassium, pH, crop },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const printDocument = () => {
    const input = document.getElementById("result");
    const pdf = new jsPDF();

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <div>
        <Typography variant="h6" className="sub-title">
          accurate Suggestions on fertilizer based on soil Type
        </Typography>
        <Typography
          style={{ marginBottom: 10 }}
          variant="subtitle1"
          color="primary"
        >
          <em>
            <b>NOTE:</b>
          </em>
          &nbsp; The values of potassium, nitrogen and phosphorous are ratio of
          content in soil.
        </Typography>

        <Divider style={{ marginBottom: 25 }} />
        <Formik
          initialValues={{
            nitrogen: "",
            phosphorous: "",
            potassium: "",
            pH: "",
            crop: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            await dispatch(suggestFertilier(data));

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <PageForm showSelected />

              <div className={classes.submitButtonContainer}>
                <ProgressButton
                  fullWidth
                  disabled={isSubmitting}
                  className={classes.signupButton}
                  type="submit"
                  loading={isSubmitting}
                >
                  Suggest Fertilizer
                </ProgressButton>
              </div>
            </Form>
          )}
        </Formik>

        <div className={classes.divider} />

        <Divider />
        <div className={classes.divider} />

        <div className={classes.containerInner}>
          {isPredictingFertlizer && (
            <div className={classes.loaderContainer}>
              <CircularProgress />
              <Typography className="text">
                Please wait for your suggestions
              </Typography>
            </div>
          )}

          {isPredictingFertlizerSuccess && (
            <>
              <div
                id="result"
                style={{
                  backgroundColor: "#f5f5f5",
                  width: "210mm",
                  minHeight: "150mm",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "10px",
                }}
              >
                <Typography gutterBottom variant="h5">
                  Fertilizer Suggestions
                </Typography>
                <hr />
                <Typography dangerouslySetInnerHTML={{ __html: result }} />

                <Box mt={5} pb={1}>
                  <Typography>
                    <em>
                      <b>NOTE:</b>
                    </em>
                    &nbsp; The values of potassium, nitrogen and phosphorous
                    (NPK) are ratio of content in soil.
                  </Typography>
                  <Typography>
                    NPK ({nitrogen}, {phosphorous}, {potassium}), pH ({pH}),
                    Crop&nbsp;({crop})
                  </Typography>
                </Box>
                <hr />
                <Typography>
                  The report has been generated at {Date()}.
                </Typography>
              </div>
              <Box mt={2}>
                <span onClick={printDocument}>
                  <Typography
                    noWrap
                    className="text"
                    variant="h6"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Save&nbsp;
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SaveAltIcon />
                    </div>
                  </Typography>
                </span>
              </Box>
            </>
          )}
          {isPredictingFertlizerFailed && (
            <Typography className="error">{fertilizerMessage}</Typography>
          )}
        </div>
      </div>
    </>
  );
};

const PageForm = ({ cropForm, showSelected }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <InputField
          placeholder="Nitrogen"
          width={true}
          type="number"
          steps="any"
          name="nitrogen"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          placeholder="Phosphorous"
          width={true}
          type="number"
          steps="any"
          name="phosphorous"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          placeholder="Potassium"
          width={true}
          type="number"
          steps="any"
          name="potassium"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          placeholder="pH Level"
          width={true}
          type="number"
          steps="any"
          name="pH"
        />
      </Grid>

      {cropForm && (
        <>
          <Grid item xs={12} sm={6}>
            <InputField
              placeholder="Rainfall (mm)"
              width={true}
              type="number"
              steps="any"
              name="rainfall"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Cities placeholder="City" name="city" />
          </Grid>
        </>
      )}

      {showSelected && (
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            label="Crop To Grow"
            name="crop"
            value=""
            className={classes.inputField}
            listData={listData.map((item) => ({
              key: item,
              value: item,
            }))}
          />
        </Grid>
      )}
    </Grid>
  );
};

export function getCityName(cityId) {
  return list.filter(({ id }) => Number(cityId) === Number(id));
}
