import apiService from "@/api/fileHttp.js";

export function uploadFile(data) {
  return apiService({
    url: "/file",
    method: "post",
    data
  });
}
