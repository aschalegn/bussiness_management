import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { userContext } from '../../../context/User';
import AdminNav from '../../Layouts/AppBar/AdminNav';
import './adminHome.css';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DateRangeIcon from '@material-ui/icons/DateRange';
import QueueIcon from '@material-ui/icons/Queue';
import "./Worker.css";
import { Trans, useTranslation } from "react-i18next"

const Home = () => {
    const { user } = useContext(userContext)
    return (
        <>
            <AdminNav location={"home"} />
            <main className="admin">
                <div className="grid-container">
                    <div className="grid-item">
                        <CalendarTodayIcon />
                        <Link to={`${user._id}/live`}>
                            <Trans i18nKey="adminNav.currentTurn"></Trans>
                        </Link>
                    </div>
                    <div className="grid-item">
                        <DateRangeIcon />
                        <Link to={`${user._id}/appointments`}>
                            <Trans i18nKey="adminNav.turns"></Trans>
                        </Link>
                    </div>
                    <div className="grid-item">
                        <QueueIcon />
                        <Link to="">
                            <Trans i18nKey="adminNav.makeAppointment"></Trans>
                        </Link>
                    </div>
                    <div className="grid-item">
                        <SettingsIcon />
                        <Link to={`${user._id}/settings`}>
                            <Trans i18nKey="adminNav.settings"></Trans>
                        </Link>
                    </div>
                    <div className="grid-item">
                        <EqualizerIcon />
                        <Link to={`${user._id}/statistic`}>
                            <Trans i18nKey="adminNav.statistics"></Trans>
                        </Link>
                    </div>
                    <div className="grid-item">
                        <PeopleAltIcon />
                        <Link to={`${user._id}/workers`}>
                            <Trans i18nKey="adminNav.workers"></Trans>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;