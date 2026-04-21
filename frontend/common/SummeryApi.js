export const baseURL = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:4000" 
    : "https://client-lead-management.onrender.com";

const summeryApi = {
    login:{
        url:"/admin/login",
        method:"post"
    },
    addLead:{
        url:"/admin/addLeads",
        method:"post"
    },
    leadsDetail:{
        url:"/admin/leadsDetail",
        method:"get"
    },
    removeLead:{
        url:"/admin/removeLead",
        method:"post"
    }
}

export default summeryApi