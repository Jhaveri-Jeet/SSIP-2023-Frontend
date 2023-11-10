import React from "react";

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Current Cases
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Case Number</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Date File</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Case type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Advocate</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Attorney Advocate
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Defendant</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Petitioner</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Judge</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Case Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Case Report</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}

              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">
                      125202
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">23 Oct 2023</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Ciminal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Ramesh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Suresh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Pending</div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                    </svg>
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">
                      125202
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">23 Oct 2023</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Ciminal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Ramesh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Suresh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">-</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Pending</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">
                      125202
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">23 Oct 2023</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Ciminal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Ramesh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Suresh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">-</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Pending</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">
                      125202
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">23 Oct 2023</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Ciminal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Ramesh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Suresh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">-</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Pending</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100">
                      125202
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">23 Oct 2023</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Ciminal</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Ramesh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Suresh Bhai</div>
                </td>
                <td className="p-2">
                  <div className="text-center">Sandeep Bhai</div>
                </td>
                <td className="p-2">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                    </svg>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">-</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">Pending</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
