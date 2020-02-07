import * as React from "react";
import styles from '../../../styles/pages/home/index.module.scss';
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Layout, Row, Col } from "antd";
import { HierarchicalVirusMap } from 'wuhan2020-mapviz';
import { isMobile } from "../../../utils/deviceHelper";
import { actionCreators as liveMapActionCreators, Actions as LiveMapActions } from "../../../store/LiveMap/actions";
import { actionCreators as donateActionCreators, Actions as DonateActions } from "../../../store/Donate/actions";
import { convertProvincesSeries, convertCountry, convertCountrySeries } from "../../../utils/isacclin";
import { IconDoctor, IconGuidebook, IconRenminPaper, IconQinghuaLogo, IconHomeBottomBanner, IconDonation, IconGift, IconFactory } from "../../../components/Icons";
import Button from "../../../components/Elements/Button";
import { URLS } from "../../../constants/urls";
import { RENMIN_PAPER_OFFICIAL, QINGHUA_OFFICIAL, COMMUNITY_HOME } from "../../../constants/globals";
import Card from "../../../components/Elements/Card";
import { AppState } from "../../../store/App";
import { IDonate } from "../../../types/interfaces";

const patch = [
  {
    "provinceName": "青海省",
    "provinceShortName": "青海",
    "confirmedCount": 1,
    "suspectedCount": 0,
    "curedCount": 0,
    "deadCount": 0,
    "comment": "",
    "cities": [
      {
        "cityName": "西宁",
        "confirmedCount": 1,
        "suspectedCount": 0,
        "curedCount": 0,
        "deadCount": 0
      }
    ],
    "country": "中国",
    "updateTime": 1580001790159
  }
]

interface ConnectedProps {
  actions: LiveMapActions & DonateActions;
  loading: boolean;
  data: any;
  app: AppState;
  donateList: IDonate[];
}

interface Props extends RouteComponentProps {

}
const { Content } = Layout;

const RESOLUTION = 3600000 * 24;
class Home extends React.PureComponent<Props, {}>
{
  public props: ConnectedProps & Props;
  
  componentWillMount() {
    this.props.actions.fetchData();
    this.props.app.dataSource && this.props.actions.fetchDonateList(this.props.app.dataSource['donation']);
  }

	componentDidMount() {
  }
  
  onViewClinic = () => {
    this.props.history.push(URLS.FREE_CONSULTATION);
  }
  onViewPrevention = () => {
    this.props.history.push(URLS.PREVENTION_AND_TREATMENT);
  }
  onViewRenminPaper = () => {
    window.open(RENMIN_PAPER_OFFICIAL, '_blank');
  }
  onViewQinghuaSite = () => {
    window.open(QINGHUA_OFFICIAL, '_blank');
  }
  onViewVolunteer = () => {
    window.open(COMMUNITY_HOME, '_blank');
  }
  onViewDonation = () => {
    this.props.history.push(URLS.DONATE);
  }
  onViewHospitals = () => {
    this.props.history.push(URLS.CLINICS);
  }
  onViewProduction = () => {
    this.props.history.push(URLS.PRODUCTION);
  }
  onViewMore = () => {
    this.props.history.push(URLS.EPIDEMIC_LIVE);
  }

	render()
	{
    const {donateList} = this.props;
    const renderedDonation = [donateList[0], donateList[1], donateList[2]];
    if (!this.props.data) return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
        <Content></Content>
      </Layout>
    );
    const data = {
      provincesSeries: convertProvincesSeries([...this.props.data['history'], ...patch], RESOLUTION, true),
      countrySeries: convertCountrySeries(this.props.data['overall'], RESOLUTION),
      countryData: convertCountry(this.props.data['current']),
    }
		return (
			<Layout style={{backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset'}}>
				<Content>
					<div className={styles.pageHome}>
            <section className={styles.pageDesc}>
              <div>{Message('PAGE_DESC')}</div>
            </section>
            <section className={styles.contentSection}>
              <div className={styles.header}>
                <div className={styles.title}>{Message('HOME_OVERVIEW_TITLE')}</div>
                <Button onClick={this.onViewMore} type='link' >{Message('MORE')}</Button>
              </div>
              <div className="virus-map" style={{width: '100%', height: '552px', padding: '20px'}}>
                <HierarchicalVirusMap data={data} resolution={RESOLUTION} type={isMobile ? 'mobile' : 'pc'} />
              </div>
            </section>
            <section className={styles.treatmentHelp}>
              <div className={styles.treatmentHelpMain}>
                <div className={styles.title}>{Message('TREATMENT_HELP')}</div>
                <Row>
                  <Col className={styles.col} lg={6} sm={12} xs={12}>
                    <div className={styles.card}>
                      <div className={styles.icon}>
                        <IconDoctor height={100} />
                      </div>
                      <div className={styles.desc}>
                        <div>关于新管状病毒</div>
                        <div>&nbsp;</div>
                        <div>在线解答</div>
                      </div>
                      <div className={styles.button}>
                        <Button onClick={this.onViewClinic} shape='round' type='ghost'>{Message('VIEW_CLINIC')}</Button>
                      </div>
                    </div>
                  </Col>
                  <Col className={styles.col} lg={6} sm={12} xs={12}>
                    <div className={styles.card}>
                      <div className={styles.icon}>
                        <IconGuidebook height={100} />
                      </div>
                      <div className={styles.desc}>
                        <div>如何预防</div>
                        <div>新兴管状病毒肺炎疑似病例</div>
                        <div>居家自我隔离的指导建议</div>
                      </div>
                      <div className={styles.button}>
                        <Button onClick={this.onViewPrevention} shape='round' type='ghost'>{Message('VIEW_PREVENTION')}</Button>
                      </div>
                    </div>
                  </Col>
                  <Col className={styles.col} lg={6} sm={12} xs={12}>
                    <div className={styles.card}>
                      <div className={styles.icon}>
                        <IconRenminPaper height={100} />
                      </div>
                      <div className={styles.desc}>
                        <div>人民日报官方</div>
                        <div>新兴肺炎</div>
                        <div>患者求助通道</div>
                      </div>
                      <div className={styles.button}>
                        <Button onClick={this.onViewRenminPaper} shape='round' type='ghost'>{Message('VIEW_RENMIN_PAPER')}</Button>
                      </div>
                    </div>
                  </Col>
                  <Col className={styles.col} lg={6} sm={12} xs={12}>
                    <div className={styles.card}>
                      <div className={styles.icon}>
                        <IconQinghuaLogo height={100} />
                      </div>
                      <div className={styles.desc}>
                        <div>清华大学官方</div>
                        <div>新兴管状病毒感染</div>
                        <div>自测评估</div>
                      </div>
                      <div className={styles.button}>
                        <Button onClick={this.onViewQinghuaSite} shape='round' type='ghost'>{Message('VIEW_QINGHUA_SITE')}</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </section>
            <section className={styles.contentSection}>
              <div className={styles.header}>
                <div className={styles.title}>{Message('HOME_CONTRIBUTE_TITLE')}</div>
              </div>
              <Row gutter={isMobile ? 0 : 24}>
                <Col lg={8} md={24} sm={24} xs={24}>
                  <Card className={styles.contributeCard}>
                    <header>
                      <IconDonation />
                      <div className={styles.text}>{Message('DONATE_MONEY')}</div>
                    </header>
                    <main>
                      <div className={styles.content}>
                        <div className={styles.title}>{Message('LATEST_DONATION')}</div>
                        {renderedDonation.map((d, index) => {
                          return (
                            <div key={d.id} className={styles.row}>{d.name}</div>
                          )
                        })}
                      </div>
                      <Button onClick={this.onViewDonation} shape='round' type='primary'>{Message('VIEW_DONATION')}</Button>
                    </main>
                  </Card>
                </Col>
                <Col lg={8} md={24} sm={24} xs={24}>
                  <Card className={styles.contributeCard}>
                    <header>
                      <IconGift />
                      <div className={styles.text}>{Message('DONATE_SUPPLIES')}</div>
                    </header>
                    <main>
                      <div className={styles.content}>
                        <div className={styles.placeholder}>{Message('DEVELOPING')}</div>
                      </div>
                      <Button onClick={this.onViewHospitals} shape='round' type='primary'>{Message('VIEW_HOSPITALS')}</Button>
                    </main>
                  </Card>
                </Col>
                <Col lg={8} md={24} sm={24} xs={24}>
                  <Card className={styles.contributeCard}>
                    <header>
                      <IconFactory />
                      <div className={styles.text}>{Message('PRODUCTION')}</div>
                    </header>
                    <main>
                      <div className={styles.content}>
                        <div className={styles.placeholder}>{Message('DEVELOPING')}</div>
                      </div>
                      <Button onClick={this.onViewProduction} shape='round' type='primary'>{Message('VIEW_PRODUCTION')}</Button>
                    </main>
                  </Card>
                </Col>
              </Row>
            </section>
            <section className={styles.contentSection}>
              <div className={styles.header}>
                <div className={styles.title}>{Message('HOME_HOTEL_TITLE')}</div>
              </div>
            </section>
            <section className={styles.banner}>
              <IconHomeBottomBanner />
            </section>
            <section className={styles.volunteer}>
              <div className={styles.text}>{Message('VOLUNTEER_INTRO1')}</div>
              <div className={styles.text}>{Message('VOLUNTEER_INTRO2')}</div>
              <Button className={styles.btn} onClick={this.onViewVolunteer} shape='round' type='ghost'>{Message('BECOME_VOLUNTEER')}</Button>
            </section>
					</div>
				</Content>
			</Layout>
		)
	}
}

const mapStateToProps = (state: IApplicationState) =>
{
	return {
    loading: state.app.loading,
    data: state.liveMap.data,
    app: state.app,
    donateList: state.donate.list,
	};
};

const mapActionsToProps = dispatch =>
{
	return {
		actions: bindActionCreators(
			{
        ...liveMapActionCreators,
        ...donateActionCreators,
			},
			dispatch,
		),
	};
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(Home));