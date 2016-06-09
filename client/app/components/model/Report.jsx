import React from 'react';
import featureImportanceImg from '../../img/feature-importance.jpg';
import rentalForecastsImg from '../../img/rental-forecasts.jpg';
import rentalsByWeatherImg from '../../img/rentals-by-weather.jpg';
import rentalsOverTimeImg from '../../img/rentals-over-time.jpg';

export default class Report extends React.Component {



	render() {
		return (
			<section className="report">
				

				<div className="report-section">
					<h2>Introduction</h2>
					<p>Divvy, a project of the Chicago Department of Transportation, is Chicago’s bike share system. With the swipe of a credit card, residents and tourists can rent a bike from one of hundreds of stations located across the city. For Divvy, accurately forecasting demand is critical to capacity sizing decisions such as when and where to build new stations and how to set staffing schedules, which would benefit commuters and travelers throughout the city of Chicago.</p>
					<p>Our task was to predict the total number of rentals at every Divvy station for four daylight time blocks: 6-9AM, 9AM-noon, noon-3PM, and 3-6PM.</p>
				</div>
				<hr />


				<div className="report-section">
					<h2>Data</h2>
					<p>Divvy has published comprehensive trip and station data spanning about 2.5 years, from mid-2013 to the end of 2015. We binned this trip-by-trip data into four standard 3-hour time intervals and merged it with the station data and with weather readings from Weather Underground, as well as with calendar information such as the day of week and Federal holidays. We trained our model on a randomly selected subset of 70% of the data, tested on the remaining 30%, and verified our results using five-fold cross-validation.</p>
					<p>Our final dataset consisted of 1,219,937 rows of Divvy station data joined by date with Weather Underground weather data. See our general report for sources to the dataset and merging scripts used.</p>
					<table>
						<tbody>
							<tr>
								<th>Feature</th>
								<th>Description</th>
							</tr>
							<tr>
								<td>trip_count</td>
								<td>the number of outbound trips from a given station for a given three-hour time period</td>
							</tr>
							<tr>
								<td>precipi</td>
								<td>average precipitation, in inches</td>
							</tr>
							<tr>
								<td>pressurei</td>
								<td>average air pressure, in psi</td>
							</tr>
							<tr>
								<td>hum</td>
								<td>average relative humidity</td>
							</tr>
							<tr>
								<td>tempi</td>
								<td>average temperature, in degrees Fahrenheit</td>
							</tr>
							<tr>
								<td>dewpti</td>
								<td>average dewpoint, in degrees Fahrenheit</td>
							</tr>
							<tr>
								<td>visi</td>
								<td>average visibility</td>
							</tr>
							<tr>
								<td>wspdi</td>
								<td>average windspeed, in mph</td>
							</tr>
							<tr>
								<td>station_id</td>
								<td>Divvy station ID</td>
							</tr>
							<tr>
								<td>latitude</td>
								<td>latitude of the station</td>
							</tr>
							<tr>
								<td>longitude</td>
								<td>longitude of the station</td>
							</tr>
							<tr>
								<td>hour_6*</td>
								<td>6-9am time period</td>
							</tr>
							<tr>
								<td>hour_9*</td>
								<td>9am-noon time period</td>
							</tr>
							<tr>
								<td>hour_12*</td>
								<td>noon-3pm time period</td>
							</tr>
							<tr>
								<td>hour_15*</td>
								<td>3-6pm time period</td>
							</tr>
							<tr>
								<td>day_x (0-6)*</td>
								<td>Monday - Sunday</td>
							</tr>
							<tr>
								<td>weekend_day*</td>
								<td>Saturday or Sunday</td>
							</tr>
							<tr>
								<td>holiday*</td>
								<td>U.S. Federal holiday</td>
							</tr>
							<tr>
								<td>month_x (1-12)*</td>
								<td>January - December</td>
							</tr>
							<tr>
								<td>days_since_first_date</td>
								<td>number of days since the first date in the dataset (to help the model account for increases in total ridership over time)</td>
							</tr>
						</tbody>
					</table>
					<span className="asterisk">* dummy variable</span>
				</div>
				<hr />


				<div className="report-section">
					<h2>Analysis</h2>
					<p>Demand is concentrated at stations near the lakefront and downtown Loop area. On weekends, demand moves even farther east as compared to weekdays.</p>
					<div className="tableau-injection">
						<div className='tableauPlaceholder'>
							<noscript>
								<a href='#'>
									<img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DivvyRentals&#47;Dashboard1&#47;1_rss.png' />
								</a>
							</noscript>
							<object className='tableauViz'>
								<param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
								<param name='path' value='views&#47;DivvyRentals&#47;Dashboard1?:embed=y&amp;:display_count=y&amp;:showTabs=y' />
								<param name='toolbar' value='yes' />
								<param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DivvyRentals&#47;Dashboard1&#47;1.png' />
								<param name='animate_transition' value='yes' />
								<param name='display_static_image' value='yes' />
								<param name='display_spinner' value='yes' />
								<param name='display_overlay' value='yes' />
								<param name='display_count' value='yes' />
								<param name='showTabs' value='y' />
							</object>
						</div>
					</div>
					<p>If we look at average rentals across all stations over time, we get a clear picture of realized demand. Although the average number of rentals across all stations is 3.8 rentals (for all three-hour periods from 6am-6pm), demand is volatile, with a standard deviation of 8.1 across all stations. It is also highly seasonal, peaking around August and hitting a low around January. There is also a clear year-over-year increase, especially from 2013 to 2014--we account for this in our model through the “days_since_first_date” variable.</p>
					<img className="report-img" src={rentalsOverTimeImg} />
					<p>Given this seasonality, one might guess that temperature would have a big impact on ridership--and indeed, this is the case. The heaviest periods for rentals coincide with temperatures around 90 degrees Fahrenheit. Conversely, we can see that precipitation has a depressing effect on rentals.</p>
					<img className="report-img" src={rentalsByWeatherImg} />
				</div>
				<hr />


				<div className="report-section">
					<h2>The Model</h2>
					<p>Our final model is a random forest of 500 trees and a minimum of 25 samples per leaf node to combat overfitting, trained via bootstrap sampling (L. Brieman, “Random Forests,” Machine Learning, 45(1), 5-32, 2001). This algorithm is fairly robust to noise and, perhaps more importantly, does well at picking up interactions between predictor variables. The importance of the latter point is easy to grasp intuitively, since one can imagine that rentals at a station near the lakefront on a warm weekend day in August will be higher than the individual predictors would suggest independently of one another.</p>
					<p>Our model is overall fairly accurate, with a mean absolute error of ~1.8 rentals per three-hour period and a mean-squared error of ~13.5. It is important to note, however, that these are average errors, and the model may be less accurate during periods of particularly high demand and/or when weather forecasts do not match actual weather patterns. We trained the model on a randomly selected subset of 70% of the data, tested on the remaining 30%, and verified our results using five-fold cross-validation. The r-squared is ~0.80, meaning that the model explains about 80% of the variation in rentals.</p>
					<p>Weather variables proved to be the most important features determining rentals, especially temperature and precipitation. Station location, the day of week, and the time of day also factor into the model, but to a lesser extent than weather.</p>
					<img className="report-img" src={featureImportanceImg} />
					<p>In addition to the random forest, we also attempted a simple OLS regression and a gradient boosting machine (J. Friedman, Greedy Function Approximation: A Gradient Boosting Machine, The Annals of Statistics, Vol. 29, No. 5, 2001). The linear regression performed relatively poorly, with a mean-absolute error of ~3.7 rentals, a mean-squared error of ~53.9, and an r-squared of ~0.18. The GBM (boosting stages: 1000, learning rate: 0.01, maximum depth: 6, minimum samples per leaf node: 25) performed slightly worse than the random forest but better than the OLS regression, with a mean-absolute error of ~2.2, a mean-squared error of ~20.2, and an r-squared of 0.70.</p>
					<table border='1'>
						<tbody>
							<tr>
							    <th>Algorithm</th>
							    <th>Mean-absolute error</th>
							    <th>Mean-squared error</th>
							    <th>R-squared</th>
						  	</tr>
						  	<tr>
							    <td>Random Forest</td>
							    <td>1.75</td>
							    <td>13.54</td>
							    <td>0.80</td>
						  	</tr>
						  	<tr>
							    <td>Gradient Boosting Machine</td>
							    <td>2.21</td>
							    <td>20.15</td>
							    <td>0.70</td>
						  	</tr>
						  	<tr>
							    <td>OLS Regression</td>
							    <td>3.72</td>
							    <td>53.90</td>
							    <td>0.18</td>
						  	</tr>
						</tbody>
					</table>
					<p>In order to better understand the accuracy of our model, let’s take a look at predictions for a typical station in the month of July. Station 5 is a busy station located at the intersection of S. State and W. Harrison Sts., just west of Buckingham Fountain and the Magnificent Mile. We can see that in 2015, average rentals for a three-hour period ranged from a daily low of about 3 to a daily high around 12. Our model does a reasonable job of minimizing overall error, but fails to capture much of the volatility. Still, it is off by more than 3 rentals on only a few days of the month.</p>
					<img className="report-img" src={rentalForecastsImg} />
				</div>
				<hr />


				<div className="report-section">
					<h2>Conclusion</h2>
					<p>Our main conclusions were as follows:</p>
					<ul>
						<li>It is possible to predict rentals with reasonable accuracy with the information provided by Divvy, combined with weather and calendar data.</li>
						<li>Weather is the most important factor that determines rentals, especially precipitation and air pressure (low air pressure is generally associated with cloudy, rainy, or snowy weather).</li>
						<li>Station location, the day of week, time of day, and whether or not the day is a holiday also factor in, but to a lesser extent than weather.</li>
						<li>High-demand summer months see the highest volatility in demand, which makes them the most difficult months in which to make accurate predictions.</li>
					</ul>
				</div>
				<hr />


				<div className="report-section">
					<h2>Further Applications</h2>
					<p>One key missing feature of this data is the number of bikes available for rental at a station at a given time. This cannot be calculated simply from the number of outgoing and incoming rentals, because Divvy has vans that transport bikes from station to station throughout the day. Divvy provides “available docks” information on its website for stations in real-time, but not for the historical data. With this additional field, it would be possible to determine when stations experienced stock outs in the past, and use that to estimate the actual demand for bikes.</p>
					<p>Knowing the actual demand (or at least a good estimate of it) would allow Divvy to calculate its capacity shortfall and the corresponding amount of revenue it is foregoing at its current capacity due to stockouts. Divvy could then weigh that lost revenue against the cost of adding capacity (whether through new stations or through increased staffing) to determine the optimal service level across all stations (J.A. Van Mieghem and G. Allon, “Safety Capacity and Inventory”, Operations Strategy, Second Edition, 493-498).</p>
				</div>


			</section>
		);
	}



};