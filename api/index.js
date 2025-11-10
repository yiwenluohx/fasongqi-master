import { postRequest,postParamsRequest,getRequest } from './request.js';
// export const base = 'http://121.36.8.217:8090';
// export const base =  "https://mx.meixiantm.com"; 
export const base =  "https://fsq.meixiantm.com"; 

// -----我的模块-----
// 授权登陆
export const getUserInfo = data => postRequest(`/api/user/empower/login`,data)

// 获取手机号
export const getPhoneNumber = data => postRequest(`/api/user/wx/getPhoneNumber`,data)

// 更新头像
export const updateUserInfo = data => postRequest(`/api/user/wx/update`,data)
// 添加访问日志
export const addLogs = data => postRequest(`/api/user/visitLog/create`,data)

// 签到记录
export const signList = data => postParamsRequest(`/api/signIn/continuous/list`,data)
// 签到
export const signIn = data => postRequest(`/api/signIn/record/create`,data)

// 文件交付
export const fileList = data => postRequest(`/api/my/task/pageList`,data)

// 文件交付详情/服务记录详情
export const taskDetail = data => postRequest(`/api/my/task/detail`,data)

// 确认完成
export const taskConfirm = data => postRequest(`/api/my/task/confirm`,data)

// 驳回
export const taskReject = data => postRequest(`/api/my/task/reject`,data)


// 我的服务记录
export const serveRecord = data => postRequest(`/api/my/server/record`,data)

// 我的文件管理库
export const fileManage = data => postRequest(`/api/my/file/library`,data)

// post_liuc_list
export const post_liuc_list = data => postRequest(`/api/forms/proceeDing`,data)

// ----首页模块----
// 合同模版列表
export const contractTemplates = data => postRequest(`/api/home/contract/templates`,data)

// 合同模版详情
export const templateDetail = data => postRequest(`/api/home/template/detail`,data)

// 合同模版下载
export const templateDownload = data => postRequest(`/api/home/template/download`,data)


// 首页五大模块列表
export const caseList = data => postRequest(`/api/home/case/page`,data)

// 详情
export const caseDetail = data => postRequest(`/api/home/case/detail`,data)

// 添加关注案例
export const addCaseAttention = data => postRequest(`/api/home/case/attention`,data)

// 首页消息提示
export const tipsList = data => postParamsRequest(`/api/home/refund/query`,data)

// ----公共接口----
// 获取用户信息
export const userInfo = data => postParamsRequest(`/api/user/wx/getUserInfoByToken`,data)

// 文档类型、行业领域下拉
// 合同审查 - 所属行业的code = clue_contract_industry
// 合同审查 -  合同类型的code = clue_contract_type
// 企业合规预警 - 所属行业的code = clue_enterprise_industry
// 企业合规预警 -  合同类型的code = clue_enterprise_rule
// 文书代写 -  纠纷分类的code = clue_dispute_type
// 文书代写 -  文书类型的code = clue_clerk_type
// 合同模板 - 所属行业code =  contract_template_industry
// 合同模板 - 合同类型code = contract_template_type
export const dropDownList = data => postRequest(`/api/common/dict/query`, data);

// 上传
export const upload = data => getRequest(`/api/common/upload/tool `, data);

// ----法务模块----
// 合同/文书/企业线索创建
export const legalCreate = data => postRequest(`/api/legal/clue/create`, data);

// 被告身份核实
export const idVerify = data => postRequest(`/api/legal/identity/verify`, data);

// 法律诉讼流程指导
export const lawsuitGuide = data => postParamsRequest(`/api/legal/lawsuit/procedure`,data)

// 品牌侵权检测
export const infringementDetection = data => postRequest(`/api/legal/infringement/detection`, data);





