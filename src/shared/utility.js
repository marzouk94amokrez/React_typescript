import { Notyf } from "notyf";
import theme from "../styles/theme";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
export const owner_invoiceStatus = [
  { name: "IMPORTED", label: "Réceptionée", color: theme.colors.gray }, //
  { name: "FILED", label: "Réceptionée", color: theme.colors.gray }, //
  { name: "INTEGRATED", label: "Réceptionée", color: theme.colors.gray }, //
  { name: "NEW", label: "Réceptionée", color: theme.colors.gray }, //
  { name: "ERROR", label: "Erreur", color: theme.colors.gray }, //
  { name: "REJECTED", label: "Rejetée", color: theme.colors.danger },
  { name: "RECEIVED", label: "Réceptionée", color: theme.colors.gray },
  {
    name: "TO_BE_CONTROLLED",
    label: "A contrôler",
    color: theme.colors.purple,
  },
  { name: "CONTROLLED", label: "Contrôlée", color: theme.colors.gray },
  { name: "LITIGATION", label: "Litige", color: theme.colors.danger },
  { name: "TO_BE_VALIDATED", label: "A valider", color: theme.colors.purple },
  { name: "VALIDATED", label: "Validée", color: theme.colors.gray },
  { name: "TO_BE_PAID", label: "A payer", color: theme.colors.gray },
  {
    name: "WAITING_FOR_PAYMENT",
    label: "Attente paiment",
    color: theme.colors.gray,
  },
  {
    name: "TRANSMITED_PAYMENT",
    label: "Paiment transmis",
    color: theme.colors.gray,
  },
  { name: "PAID", label: "Payée", color: theme.colors.greenLight },
  {
    name: "DEADLINEEXCEEDED",
    label: "Echéance dépassée",
    color: theme.colors.purple,
  },
];

export const getStatusBgColor = (state) => {
  let stat = owner_invoiceStatus.filter((s) => s.name === state);
  // console.log(invoiceStatus.filter(s =>  s.name === state ))
  // console.log(state)
  return stat[0]?.color;
};
export const getUserStatusBgColor = (state) => {
  let stat = user_invoiceStatus.filter((s) => s.name === state);
  // console.log(invoiceStatus.filter(s =>  s.name === state ))
  // console.log(state)
  return stat[0]?.color;
};

export const getStatusLabel = (state) => {
  let stat = owner_invoiceStatus.filter((s) => s.name === state);
  // console.log(invoiceStatus.filter(s =>  s.name === state ))
  // console.log(state)
  return stat[0]?.label;
};

export const user_invoiceStatus = [
  { name: "RECEIVED", label: "Prise en charge", color: theme.colors.gray },
  { name: "REJECTED", label: "Rejetée", color: theme.colors.danger },
  { name: "PENDING", label: "Prise en charge", color: theme.colors.gray },
  { name: "LITIGATION", label: "Litige", color: theme.colors.danger },
  { name: "APPROUVED", label: "Approuvée", color: theme.colors.gray },
  {
    name: "TO_BE_CONTROLLED",
    label: "Prise en charge",
    color: theme.colors.gray,
  },
  {
    name: "TO_BE_VALIDATED",
    label: "Prise en charge",
    color: theme.colors.gray,
  },
  { name: "TO_BE_PAID", label: "Prise en charge", color: theme.colors.gray },
  { name: "CONTROLLED", label: "Prise en charge", color: theme.colors.gray },
  { name: "VALIDATED", label: "Prise en charge", color: theme.colors.gray },
  {
    name: "PARTIALLY_APPROUVED",
    label: "Approuvée partiellement",
    color: theme.colors.gray,
  },
  {
    name: "TRANSMITED_PAYMENT",
    label: "Paiment transmis",
    color: theme.colors.gray,
  },
  { name: "PAID", label: "Payée", color: theme.colors.greenLight },
  {
    name: "DEADLINEEXCEEDED",
    label: "Echéance dépassée",
    color: theme.colors.purple,
  },
];

export const formatDate = (date) => {
  if (date !== null && date.valueOf() > 0) {
    let newDate = new Date(date);
    let day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    let month =
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    return day + "/" + month + "/" + newDate.getFullYear();
  } else return null;
};

export const specFormatDate = (date) => {
  if (date !== null && date.valueOf() > 0) {
    let newDate = new Date(date);
    let day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    let month =
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    return newDate.getFullYear() + "-" + month + "-" + day;
  } else return null;
};

export const dayForIntervalMonth = () => {
  const monthList = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const moonLanding = new Date();
  var now = new Date();
  moonLanding.setMonth(moonLanding.getMonth() - 1);
  var daysOfYear = [];
  for (var d = moonLanding; d < now; d.setDate(d.getDate() + 1)) {
    var day = d.getDate().toString();
    if (day.length === 1) {
      day = "0" + d.getDate();
    }
    let month = monthList[d.getMonth()].substring(0, 3);
    let year = d.getFullYear().toString();
    let yearS = year.substring(2, 4);
    daysOfYear.push(day + "/" + month + "/" + yearS);
  }

  return daysOfYear;
};
export const dayForIntervalMonthWithKey = () => {
  const moonLanding = new Date();
  var now = new Date();
  let firstDay = now.getDate();
  moonLanding.setMonth(moonLanding.getMonth() - 1);

  var i = 0;
  var daysOfYear = [];
  for (var d = moonLanding; d < now; d.setDate(d.getDate() + 1)) {
    let element = {};
    element.key = d.getDate();
    element.value = i;
    daysOfYear.push(element);
    i++;
  }
  return daysOfYear;
};

export const formatDateEur = (date) => {
  if (date !== null && date.valueOf() > 0) {
    let newDate = new Date(date);
    let day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    let month =
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    return newDate.getFullYear() + "-" + month + "-" + day;
  } else return null;
};

export const getStatusWithKey = (key, userType = null) => {
  const status = {
    NEW: "En cours",
    CONTROLLED: userType === "supplier" ? "Prise en charge" : "Contrôlée",
    VALIDATED: userType === "supplier" ? "Prise en charge" : "Validée",
    TO_BE_PAID: "À payer",
    TO_BE_CONTROLLED:
      userType === "supplier" ? "Prise en charge" : "À contrôler",
    TO_BE_VALIDATED: userType === "supplier" ? "Prise en charge" : "À valider",
    PAID: "Payée",
    FILED: "Importée",
    LITIGATION: "Litige",
    IMPORTED: "Importée",
    INTEGRATED: userType === "client" ? "Reçue" : "Intégrée",
    REFUSED: "Refusée",
    REJECTED: "Rejetée",
    ERROR: "Erreur",
    RECEIVED: userType === "supplier" ? "Prise en charge" : "Réceptionée",
    RELANCE: "2ème relance téléphonique",
    CONFIRMED: "Confirmée",
    WFD: "En attente de livraison",
    DELIVERED: "Livrée",
  };
  return status[key];
};

export const showColumn = (column, field) => {
  if (column.filter((column) => column.field === field)[0]?.show === true)
    return true;
  else return false;
};

export const getAlignPosition = (columns, field) => {
  let alignItem = columns.filter((column) => column.field === field);
  return alignItem[0]?.alignSelf;
};

export const getEntityStatusWithKey = (key) => {
  const status = {
    ACTIVE: "Actif",
    INACTIVE: "Inactif",
    INPROGRESS: "En cours",
    ARCHIVED: "Archivé",
  };
  return status[key];
};
export const getEreportingTypeeWithKey = (key) => {
  const status = {
    RECEIVED: "Fournisseur",
    SENT: "Client",
  };
  return status[key];
};
export const getChannelWithKey = (key) => {
  const status = {
    EDI: "EDI",
    PAPER: "Papier",
    EMAIL: "Email",
    CHORUS: "Chorus",
    PORTAL: "Portail",
    PDP: "PDP",
    PPF: "PPF",
  };
  return status[key];
};

// export const getThirtyNextDays = () => {
//     const today = new Date();
//     let nextDays = [today.getTime()]
//     for (let i = 1; i < 30 ; i++) {
//         let nextDay = today.setDate(today.getDate() + 1);
//         nextDays.push(nextDay)
//     }
//     return nextDays;
// }

export const getThirtyNextDays = (period) => {
  const d = new Date(new Date().getFullYear(), 0, 1);
  console.log(d.getDate() + 35);
  var date1 = new Date(d);
  var date2 = new Date();
  var Diff_temps = date2.getTime() - date1.getTime();
  var Diff_jours = Diff_temps / (1000 * 3600 * 24);
  const today = new Date();

  switch (period) {
    case "y":
      let nextDays = [d.getTime()];
      for (let i = 1; i < Math.round(Diff_jours); i++) {
        let nextDay = d.setDate(d.getDate() + 1);
        nextDays.push(nextDay);
      }
      return nextDays;
    case "m":
      let nextDa = [today.getTime()];
      for (let i = 1; i < 30; i++) {
        let nextDay = today.setDate(today.getDate() + 1);
        nextDa.push(nextDay);
      }
      return nextDa;

    case null:
      let nextD = [today.getTime()];
      for (let i = 1; i < 30; i++) {
        let nextDay = today.setDate(today.getDate() + 1);
        nextD.push(nextDay);
      }
      return nextD;

    case "d":
      let next = [today.getTime()];
      for (let i = 1; i < 2; i++) {
        let nextDay = today.setDate(today.getDate() + 1);
        next.push(nextDay);
      }
      return next;
  }
};

export const getTimeDate = (date) => {
  let newDate = new Date(date);
  let hour =
    newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
  let minutes =
    newDate.getMinutes() < 10
      ? "0" + newDate.getMinutes()
      : newDate.getMinutes();
  return hour + ":" + minutes;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
    .format(number)
    .replaceAll(".", " ");
};

export const verificationData = (res, entity) => {
  if (res.unitesLegales[0].denominationUniteLegale === entity.name) {
    return true;
  }
};

const updateDate = (a) => {
  let d = new Date(+a);
  let dateLimit = d.setDate(d.getDate() - 15);
  let dateLimitTime = d.getTime();
  return dateLimitTime;
};
export const validatDocs = (list, data) => {
  let newDate = new Date();
  var time = newDate.getTime();

  var validDoc = list?.map(function (e) {
    return {
      ...e,
      valide: data.some(
        (row) =>
          row.type === e.value && row.expirationDate > time && row.valid === "1"
      ),
    };
  });

  var validDoc2 = validDoc?.map(function (e) {
    return {
      ...e,
      alert: data.some(
        (row) =>
          row.type === e.value &&
          time > updateDate(row.expirationDate) &&
          row.valid === "1"
      ),
    };
  });
  var validDoc3 = validDoc2?.map(function (e) {
    return {
      ...e,
      attent: data.some(
        (row) =>
          row.type === e.value && row.valid === null && row.invalidate === null
      ),
    };
  });
  return validDoc3;
};
export const getNotyfObject = () => {
  const notyf = new Notyf({
    types: [
      {
        type: "warning",
        background: "orange",
        duration: 5000,
        dismissible: true,
      },
      {
        type: "error",
        background: "indianred",
        duration: 5000,
        dismissible: true,
      },
    ],
  });

  return notyf;
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const removeObject = (array, object) => {
  if (array.indexOf(object) !== -1) array.splice(array.indexOf(object), 1);
};

export const tagsRandom = (value) => {
  // console.log("value in tagsRandom utility")
  // console.log(value)

  if (value?.includes("[DOCNUMBER]"))
    value = value?.replace(
      "[DOCNUMBER]",
      "F" + Math.floor(Math.random() * 999999)
    );

  if (value?.includes("[TTC]")) value = value.replace("[TTC]", "15023,00");

  if (value?.includes("[HT]")) value = value.replace("[HT]", "17902,00");

  if (value?.includes("[FICHIERJOINT]"))
    value = value.replace("[FICHIERJOINT]", "Document.pdf");

  if (value?.includes("[DEVISE]"))
    value = value.replace("[DEVISE]", "Document.pdf");

  if (value?.includes("[TOKEN]"))
    value = value?.replace("[TOKEN]", "&789845oigr");

  if (value?.includes("[CREATION]")) value = value.replace("[CREATION]", "F");

  // console.log("after checking includes ")
  // console.log(value)

  return value;
};

export const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

export const uniqueObjsArrayByUid = (arrayToFilter) => {
  const seen = new Set();
  const filteredArr = arrayToFilter.filter((el) => {
    const duplicate = seen.has(el.uid);
    seen.add(el.uid);
    return !duplicate;
  });
  return filteredArr;
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const ucFirst = (toFormat) => {
  return toFormat.charAt(0).toUpperCase() + toFormat.slice(1);
};

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const convertFileToBase64 = (file) =>
  new Promise((resolve) => {
    let baseUrl = "";
    let reader = new FileReader();
    //convert the file tobase64 text
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log('reader____', reader);
      baseUrl = reader.result;
      //console.log("baseUrl", baseUrl);
      resolve(baseUrl);
    };
    reader.onerror = (err) => console.log(err);
  });

export const downloadDocumentClickHandler = (pdfFile, pdfFileName, pdfType) => {
  //________Direct Download_____
  let blob = new Blob([pdfFile], { type: pdfType });
  const downloadUrl = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = "data:" + pdfType + ";base64," + pdfFile;
  a.download = pdfFileName;
  document.body.appendChild(a);
  a.click();

  //__________Visualize In The Browser _____
  // const blob = dataURItoBlob(data);
  // const url = URL.createObjectURL(blob);

  // // to open the PDF in a new window
  // window.open(url, '_blank');
};
