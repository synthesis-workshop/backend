import { KeystoneContext } from "@keystone-6/core/types";

export const GoogleFormSubmission = async (
  req: any,
  res: any,
  commonContext: KeystoneContext<any>,
) => {
  const data = req.body;

  const context = await commonContext.withRequest(req, res);
  await context.db.EmailMessage.createOne({ data });

  const formData = new FormData();
  formData.append("entry.2005620554", data.name);
  formData.append("entry.1045781291", data.email);
  formData.append("entry.1065046570", data.subject);
  formData.append("entry.1166974658", data.message);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSfC4j_lyHmHWRUp1shKlNxzPIdE_QVIzfXwIfLLoBqlVo_12A/formResponse",
    {
      method: "POST",
      body: formData,
    },
  ).catch((err) => {
    console.log(err);
  });

  return res.json(data);
};
