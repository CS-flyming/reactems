import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route
} from 'react-router-dom'

import WelCome from 'components/WelCome'
import ArticleDetail from 'containers/ArticleContainer'
import Exp from 'containers/ExpContainer'
import YwcExp from 'containers/ExpContainer/YwcExp'

import StuIngExp from 'containers/ExpContainer/stuIngExp'
import TeaFqExp from 'containers/ExpContainer/teaFqExp'
import AddExp from 'containers/ExpContainer/addExp'
import DspExp from 'containers/ExpContainer/dspExp'
import TeaYwcExp from 'containers/ExpContainer/teaYwcExp'
import ExpGdInfo from 'containers/ExpContainer/expGdInfo'

import MsgList from 'containers/MsgContainer'
import FqMsg from 'containers/MsgContainer/fqMsg'
import FqMsgList from 'containers/MsgContainer/fqMsgList'
/*import NotFound from '../components/NotFound'*/

import Purchase from 'containers/PurchaseContainer'
import PurchaseForm from 'containers/PurchaseContainer/purchaseForm'
import PurchaseReviewList from 'containers/PurchaseContainer/purchaseReviewList'
import Setadmin from 'containers/PurchaseContainer/setadmin'

import FileRecord from 'containers/RecordContainer'
import AccountRecord from 'containers/RecordContainer/accountRecord'
import AddFileRecord from 'containers/RecordContainer/addFileRecord'
import PurchaseRecord from 'containers/RecordContainer/purchaseRecord'

import AccountList from 'containers/AccountContainer'
import AddAccount from 'containers/AccountContainer/addAccount'
import AddSchool from 'containers/AccountContainer/addSchool'
import SchoolAccount from 'containers/AccountContainer/schoolAccount'
export const routes = (
	<Switch>
		<Route exact path="/" component={WelCome}/>
		{/*账号管理*/}
		<Route path='/account_manage' component={AccountList}/>
		<Route path='/account_xxgly' component={AccountList}/>
		<Route path='/add_account' component={AddAccount}/>
		<Route path='/school_list' component={SchoolAccount}/>
		<Route path='/add_school' component={AddSchool}/>

		{/*实验管理*/}
		<Route path='/start_exp_list' component={TeaFqExp}/>
    	<Route path='/stujxz_exp' component={Exp}/>
    	<Route path='/stuywc_exp' component={YwcExp}/>
    	<Route path='/expstu_info' component={YwcExp}/>
    	<Route path='/tjsyzb/:syid' component={StuIngExp}/>
    	<Route path='/tjsyjl/:syid' component={StuIngExp}/>
		<Route path='/add_exp' component={AddExp}/>
		<Route path='/dsp_exp' component={DspExp}/>
		<Route path='/teaywc_exp' component={TeaYwcExp}/>
		<Route path='/exptea_info' component={TeaYwcExp}/>
		<Route path='/gd_exp/:id' component={ExpGdInfo}/>

    	{/*消息管理*/}
		<Route path='/mymsg_list' component={MsgList}/>
		<Route path='/fqmsg' component={FqMsg}/>
		<Route path='/fqmsg_list' component={FqMsgList}/>

		{/*采购管理*/}
		<Route path='/purchase/:type' component={PurchaseForm}/>

		<Route path='/yqgl_list'  component={Purchase}/>
		<Route path='/hcgl_list'  component={Purchase}/>

		<Route path='/lsyqsh_list' component={PurchaseReviewList}/>
		<Route path='/lshcsh_list' component={PurchaseReviewList}/>
		<Route path='/yqsh_list' component={PurchaseReviewList}/>
		<Route path='/hcsh_list' component={PurchaseReviewList}/>

		<Route path='/zdcggly'  component={Setadmin}/>

		{/*档案管理*/}
		<Route path='/other_da' component={FileRecord}/>
		<Route path='/cj_otherda' component={AddFileRecord}/>
		<Route path='/account_info' component={AccountRecord}/>
		<Route path='/cg_info' component={PurchaseRecord}/>

		{/*文章详情*/}
		<Redirect to="/"/>
		{/*未设置重定向可以设置404*/}
		{/*<Route component={NotFound}/>*/}
    </Switch>
)
export const articleRoutes = (
	<Router>
		<Route path='/article_detail/:id/:type' component={ArticleDetail}/>
    </Router>
)