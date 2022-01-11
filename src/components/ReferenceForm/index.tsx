import imageToBase64 from "image-to-base64/browser";
import React, { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Referee } from "../../interfaces";
import { useSendRefereeMutation } from "../../services/Mutations/apis";
import { useHistory } from "react-router-dom";
import { getBase64 } from "./../../utils/utilities";
import {
  FileService,
  validateFileSize,
  validateFileType,
} from "../../utils/validator";
import Loader from "../Loader";

type Params = {
  email: string;
  phone?: string;
  fullName?: string;
};

export default function RefererForm() {
  let { email, phone, fullName }: Params = useParams();
  const history = useHistory();

  console.log(">>>>email", email);

  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");
  const [accName, setAccName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [addressOfBank, setAddressOfBank] = useState("");
  const [fieldError, setFieldError] = useState("");

  const [checked, setChecked] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileBase64, setFileBase64] = useState("");
  const [imgName, setImageName] = useState("");
  const [docTypeName, setDocTypeName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [doc, setDoc] = useState<File>();
  const [uploadDocError, setUploadDocError] = useState("");
  const [sendReferee, { data, error, isLoading }] = useSendRefereeMutation();

  const handleFiles = async (e: HTMLInputElement) => {
    const file = e.files;

    if (!file) {
      return setUploadDocError("an image is required");
    }
    const validFileSize = await validateFileSize(file[0]?.size);

    const validFileType = await validateFileType(
      FileService.getFileExtension(file[0]?.name)
    );

    if (!validFileSize.isValid) {
      setUploadDocError(validFileSize.errorMessage);
      return;
    }

    if (!validFileType.isValid) {
      setUploadDocError(validFileType.errorMessage);
      return;
    }
    const imageUrl = URL.createObjectURL(file[0]);

    setFileUrl(imageUrl);
    setDoc(file[0]);
    setFileType(file[0].type);
    setImageName(file[0].name);
    // imageToBase64(file)
    //   .then((response: any) => {
    //     setFileBase64(response);
    //   })
    //   .catch((e: any) => console.log(e));
    getBase64(file).then((result: any) => {
      setFileBase64(result);
    });
    setUploadDocError("");
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!address) {
      return setFieldError("Address is required");
    }

    if (!bank) {
      return setFieldError("bank is required");
    }
    if (!accNumber) {
      return setFieldError("Account Number is required");
    }

    if (!accName) {
      return setFieldError("Account Name is required");
    }

    if (!fileBase64) {
      return setFieldError("Please upload your Signature");
    }

    if (uploadDocError) {
      return;
    }

    const data: Referee = {
      email,
      address,
      bankName: bank,
      accName,
      accountNo: accNumber,
      bankAddress: addressOfBank,
      uploadDoc: fileBase64,
      extensiontype: fileType,
    };

    console.log(">>>>>refData", data);

    sendReferee(data);
    setFieldError("");
  };

  console.log(">>>> response", data, error);

  return (
    <div className="main_content" id="main-content">
      <div className="page">
        <div className="flex-column">
          <div className="card nib_ref_form_banner">
            <label className="text-center font-weight-700 nib">
              CURRENT ACCOUNT REFERENCE FORM
            </label>
          </div>

          {data?.responseCode === "00" && history.push("/success")}

          <form className="d-flex justify-content-center" onSubmit={submitForm}>
            <div className="col-lg-8 m-b-50">
              <div className="tab-content p-30" id="myTabContent">
                <div className="tab-pane fade show active nib_ref_form">
                  <div className="col-lg-12 m-t-20">
                    <div className="row">
                      <div className="body col-lg-12 border border-radius p-30">
                        <div className="col-lg-12 m-t-20">
                          {fieldError && (
                            <p className="d-flex justify-center items-center text-danger text-center">
                              {fieldError}
                            </p>
                          )}
                          {uploadDocError && (
                            <p className="d-flex justify-center items-center text-danger text-center">
                              {uploadDocError}
                            </p>
                          )}

                          {data?.responseCode === "99" && (
                            <p className="text-danger ml-2">
                              Sorry, Something went wrong
                            </p>
                          )}
                          <div className="row">
                            <div className="form-group col-lg-4 col-md-12 col-sm-12 m-b-20 font-weight-700">
                              <label>FULL NAME</label>
                              <input
                                type="text"
                                value={fullName}
                                className="form-control m-b-10"
                                readOnly
                              />
                            </div>

                            <div className="form-group col-lg-4 col-md-12 col-sm-12 m-b-20 font-weight-700">
                              <label>PHONE NUMBER</label>
                              <input
                                type="text"
                                value={phone}
                                className="form-control m-b-10"
                                readOnly
                              />
                            </div>

                            <div className="form-group col-lg-4 col-md-12 col-sm-12 m-b-20 font-weight-700">
                              <label>EMAIL</label>
                              <input
                                type="text"
                                value={email}
                                className="form-control m-b-10"
                                readOnly
                              />
                            </div>

                            <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20 font-weight-700">
                              <label>ADDRESS</label>
                              <textarea
                                className="form-control m-b-10"
                                style={{ resize: "none" }}
                                onChange={(e) => setAddress(e.target.value)}
                                name="address"
                              ></textarea>
                            </div>

                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <label className="ref_bank">NAME OF BANK</label>

                              <select
                                className="form-control"
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                              >
                                <option selected>Choose your bank</option>
                                <option value="access">Access Bank</option>
                                <option value="citibank">Citibank</option>
                                <option value="diamond">Diamond Bank</option>
                                <option value="ecobank">Ecobank</option>
                                <option value="fidelity">Fidelity Bank</option>
                                <option value="firstbank">First Bank</option>
                                <option value="fcmb">
                                  First City Monument Bank (FCMB)
                                </option>
                                <option value="fsdh">FSDH Merchant Bank</option>
                                <option value="gtb">
                                  Guarantee Trust Bank (GTB)
                                </option>
                                <option value="heritage">Heritage Bank</option>
                                <option value="Keystone">Keystone Bank</option>
                                <option value="rand">Rand Merchant Bank</option>
                                <option value="skye">Skye Bank</option>
                                <option value="stanbic">
                                  Stanbic IBTC Bank
                                </option>
                                <option value="standard">
                                  Standard Chartered Bank
                                </option>
                                <option value="sterling">Sterling Bank</option>
                                <option value="suntrust">Suntrust Bank</option>
                                <option value="union">Union Bank</option>
                                <option value="uba">
                                  United Bank for Africa (UBA)
                                </option>
                                <option value="unity">Unity Bank</option>
                                <option value="wema">Wema Bank</option>
                                <option value="zenith">Zenith Bank</option>
                              </select>
                            </div>

                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <label>ACCOUNT NAME:</label>
                              <input
                                value={accName}
                                name="accountName"
                                type="text"
                                className="form-control m-b-10"
                                onChange={(e) => setAccName(e.target.value)}
                              />
                            </div>

                            <div className="form-group col-lg-4 col-md-12 col-sm-12 font-weight-700">
                              <label>ACCOUNT NUMBER:</label>
                              <input
                                value={accNumber}
                                onChange={(e) => setAccNumber(e.target.value)}
                                name="accountNumber"
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  (e.target.value = e.target.value.slice(0, 10))
                                }
                                type="number"
                                className="form-control m-b-10"
                              />
                            </div>

                            <div className="form-group col-lg-12 col-md-12 col-sm-12 font-weight-700">
                              <label>ADDRESS OF BANK</label>
                              <textarea
                                value={addressOfBank}
                                onChange={(e) =>
                                  setAddressOfBank(e.target.value)
                                }
                                className="form-control m-b-10"
                                style={{ resize: "none" }}
                              ></textarea>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 col-sm-12 font-weight-700">
                              <label className="text-center">
                                UPLOAD SIGNATURE
                              </label>
                              <div className="border py-3 pl-2">
                                <input
                                  type="file"
                                  onChange={(e: SyntheticEvent) =>
                                    handleFiles(
                                      e.currentTarget as HTMLInputElement
                                    )
                                  }
                                  className=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group col-lg-12 col-md-12 col-sm-12 m-t-50 m-b-20 font-weight-500">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="custom-control">
                    <input
                      type="checkbox"
                      checked={checked}
                      className="mx-2 mt-1"
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                    <label className="">
                      I agree to the
                      <a href="#" style={{ textDecoration: "underline" }}>
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group col-lg-12 col-md-12 col-sm-12 m-t-50 m-b-20">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="user_acct_details col-lg-4 col-md-6 col-sm-12 m-b-10">
                    <button
                      disabled={!checked}
                      className="btn btn-block btn-suntrust font-weight-900"
                    >
                      {isLoading ? <Loader /> : "SUBMIT"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
