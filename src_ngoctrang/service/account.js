import api from "../api";

export const UpdateInforAccount = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("edit_info_ctv", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetListCTV = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_ctv_child", data)
      .then((result) => {
        console.log('result__',result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}; //using

export const UpgradeUser = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("upgrade_user", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}; //using

export const GetInformation = (data) => {   
  return new Promise((resolve, reject) => {
    return api
      .post("get_infomation", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetLevelCTV = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_list_discount", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const BlockAccout = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("update_status_user", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const GetCommission = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("get_commission", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}; //using hoa hồng


export const ReportCTV = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("report_ctv_detail", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const ReportDefault = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("report_default", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const ReportItem = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("report_item", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};


export const ReportFluc = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("report_fluctuations", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};


export const ReportCTVTT = (data) => {
  return new Promise((resolve, reject) => {
    return api
      .post("report_ctv", data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};