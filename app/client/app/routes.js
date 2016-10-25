import React from 'react'
import { Route, Link, IndexRoute, Redirect, BrowserHistory } from "react-router"

import App from './containers/App'
import ChartBuilder from "./containers/ChartBuilder.react.jsx"
import CollectionList from "./containers/CollectionList.react.jsx";
import Topbar from "./components/nav/Topbar.react.jsx";
import Archive from "./containers/Archive.react.jsx";
import UserProfile from "./components/user/UserProfile.react.jsx";
import UserSettings from "./components/user/UserSettings.react.jsx";
import Helpdesk from "./containers/Helpdesk.react.jsx";

import ChartListView from "./containers/public/ChartListView";
import ChartView from "./containers/public/ChartView";
import ChartPreview from "./containers/public/ChartPreview";
import ChartViewEmbed from "./containers/public/ChartViewEmbed.react.jsx";

import PublisherSettings from "./components/publisher/PublisherSettings"
import ActivityList from "./components/activity/ActivityList"
import ActivityEdit from "./components/activity/ActivityEdit"
import OrgSettings from "./components/publisher/OrgSettings"
import DatasetsSettings from "./components/publisher/DatasetsSettings"

import {ErrorPage} from "./containers/ErrorPage.react.jsx";

import io from 'socket.io-client'
import { wrapPromise } from './utils/promise.js'
import { isLoggedIn } from './utils/login.js'

import store from './app'

function requireAuth(nextState, replace) {
    // console.log("logged in: " + isLoggedIn(store.getState()));
    if (!isLoggedIn(store.getState())) {
        window.location = "/"
    }
}

export default (
    <Route path="/" component={App}>

        <Route onEnter={requireAuth}>
            <IndexRoute component={CollectionList}/>
            <Route path="chartbuilder/:id" component={ChartBuilder} />
            <Route path="chartbuilder/:id/preview" component={ChartPreview} />
            <Route path="collection" component={CollectionList}/>

            <Route path="publisher/activities" component={ActivityList}/>
            <Route path="publisher/activity" component={ActivityEdit}/>
            <Route path="publisher/settings" component={PublisherSettings}/>
            <Route path="publisher/organisation" component={OrgSettings}/>
            <Route path="publisher/datasets" component={DatasetsSettings}/>

            {/*<Route path="topbar" component={Topbar}/>*/}
            <Route path="user/profile" component={UserProfile}/>
            <Route path="user/settings" component={UserSettings}/>
            <Route path="archive" component={Archive}/>
            <Route path="help" component={Helpdesk}/>
        </Route>

        <Route path="public" component={CollectionList}/>
        <Route path="public/charts" component={ChartListView}/>
        <Route path="public/charts/:id" component={ChartView}/>
        <Route path="public/charts/:id/embed" component={ChartViewEmbed}/>

        <Route path="*" component={ErrorPage}/>
    </Route>
)
