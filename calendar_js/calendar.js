(function($){
	$.fn.calendar = function(){

		// var settings = $.extend({}, options);

		setHtml(this);

		function setHtml(element){
			var today;
			element.append('<div class="js-calendar"></div>');
			$('.js-calendar').append('<div class="js-calendarHead"><div class="js-calendarPrev"><span class="js-calendarPrevInner">▼</span></div><div class="js-calendarCurrent"></div><div class="js-calendarNext"><span class="js-calendarNextInner">▼</span></div></div><div class="js-calendarTable"><div class="js-calendarTableRow"><div class="js-calendarTableCell sunday">日</div><div class="js-calendarTableCell">月</div><div class="js-calendarTableCell">火</div><div class="js-calendarTableCell">水</div><div class="js-calendarTableCell">木</div><div class="js-calendarTableCell">金</div><div class="js-calendarTableCell saturday">土</div></div><div class="js-calendarTableRow"><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div></div><div class="js-calendarTableRow"><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div></div><div class="js-calendarTableRow"><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div></div><div class="js-calendarTableRow"><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div></div><div class="js-calendarTableRow"><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div><div class="js-calendarTableCell js-calendarTableCellDate"></div></div></div>');

			var date = new Date();
			var date_prev,date_next;
			if( date.getMonth() == 0 ){
				date_prev = {'year':date.getFullYear() - 1,'month':12};
				date_next = {'year':date.getFullYear(),'month':date.getMonth() + 2};
			}else if(date.getMonth() == 11){
				date_prev = {'year':date.getFullYear(),'month':date.getMonth()};
				date_next = {'year':date.getFullYear() + 1,'month':1};
			}else{
				date_prev = {'year':date.getFullYear(),'month':date.getMonth()};
				date_next = {'year':date.getFullYear(),'month':date.getMonth() + 2};
			}
			$('.js-calendarPrev').attr('data-cal',date_prev.year + '/' + date_prev.month);
			$('.js-calendarNext').attr('data-cal',date_next.year + '/' + date_next.month);
			$('.js-calendarCurrent').text(date.getFullYear() + '年' + (date.getMonth() + 1) + '月');
			var calendar_array = getCalendar(date.getFullYear(),date.getMonth()+1);

			var calendar_cell = $('.js-calendarTableCell.js-calendarTableCellDate');
			var calendar_cell_html = calendar_cell.last().parent('.js-calendarTableRow').clone();
			if( calendar_array.length > calendar_cell.length ){
				$('.js-calendarTable').append(calendar_cell_html);
			}else if(calendar_array.length < calendar_cell.length){
				$('.js-calendarTableRow').last().remove();
			}

			$('.js-calendarTableCell.js-calendarTableCellDate').each(function(i){
				$(this).text(calendar_array[i].day).attr('data-cal',calendar_array[i].year +'/'+ calendar_array[i].month +'/'+ calendar_array[i].day );
				if( !calendar_array[i].current_flag ){
					$(this).addClass('notCurrent');
				}
			});

			today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
			$('.js-calendarTableCell.js-calendarTableCellDate[data-cal="' + today + '"]').addClass('today');

			$('.js-calendarPrev,.js-calendarNext').click(function(){
					var this_date = $(this).attr('data-cal');
					var this_date_array = this_date.split('/');
					this_date_year = parseInt(this_date_array[0]);
					this_date_month = parseInt(this_date_array[1]);
					if( this_date_month == 1 ){
						date_prev = {'year':this_date_year - 1,'month':12};
						date_next = {'year':this_date_year,'month':this_date_month + 1};
					}else if(this_date_month == 12){
						date_prev = {'year':this_date_year,'month':this_date_month - 1};
						date_next = {'year':this_date_year + 1,'month':1};
					}else{
						date_prev = {'year':this_date_year,'month':this_date_month - 1};
						date_next = {'year':this_date_year,'month':this_date_month + 1};
					}
					$('.js-calendarPrev').attr('data-cal',date_prev.year + '/' + date_prev.month);
					$('.js-calendarNext').attr('data-cal',date_next.year + '/' + date_next.month);
					$('.js-calendarCurrent').text(this_date_year + '年' + this_date_month + '月');
					calendar_array = getCalendar(this_date_year,this_date_month);
					$('.js-calendarTableCell').removeClass('notCurrent');

					if( calendar_array.length > $('.js-calendarTableCell.js-calendarTableCellDate').length ){
						$('.js-calendarTable').append(calendar_cell_html);
					}else if(calendar_array.length < $('.js-calendarTableCell.js-calendarTableCellDate').length){
						$('.js-calendarTableRow').last().remove();
					}

					$('.js-calendarTableCell.js-calendarTableCellDate').each(function(i){
						$(this).text(calendar_array[i].day).attr('data-cal',calendar_array[i].year +'/'+ calendar_array[i].month +'/'+ calendar_array[i].day );
						if( !calendar_array[i].current_flag ){
							$(this).addClass('notCurrent');
						}
					});

					$('.js-calendarTableCell').removeClass('today');
					$('.js-calendarTableCell[data-cal="' + today + '"]').addClass('today');

				});

		}

		function getCalendar(year,month){
			var date = new Date(year,month,0);
			var current_year = date.getFullYear();
			var current_month = date.getMonth() + 1;
			var current_day_end = date.getDate();
			var current_date = new Date(current_year,current_month - 1,1);
			var prev_month,prev_year,next_month,next_year;
			// console.log(String(year)+String(month)+String(day));
			var calendar_array = new Array();
			for (var i = 1; i <= current_day_end; i++) {
				calendar_array.push({'year':current_year,'month':current_month,'day':i,'current_flag':true});
			}
			if( current_month == 1 ){
				prev_year  = year - 1;
				prev_month = 12;
				next_year  = current_year;
				next_month = current_month + 1;
			}else if( current_month == 12 ){
				prev_year  = current_year;
				prev_month = current_month - 1;
				next_year  = current_year + 1;
				next_month = 1;
			}else{
				prev_year  = current_year;
				prev_month = current_month - 1;
				next_year  = current_year;
				next_month = current_month + 1;
			}
			var current_date_start = current_date.getDay();
			if( current_date_start != 0 ){
				var prev_date = new Date(prev_year,prev_month,0);
				for (var k = 0; k < current_date_start; k++) {
					// calendar_array.unshift(prev_date.getDate() - k);
					calendar_array.unshift({'year':prev_year,'month':prev_month,'day':prev_date.getDate() - k,'current_flag':false});
				}
			}
			var current_date_end = date.getDay();
			if( current_date_end != 6 ){
				var temp_day = 1;
				for (var j = current_date_end; j < 6; j++) {
					// calendar_array.push(temp_day);
					calendar_array.push({'year':next_year,'month':next_month,'day':temp_day,'current_flag':false});
					temp_day++;
				}
			}
			return calendar_array;
			// var next_date = new Date(next_year,next_month,1);
			// var prev_month_last_day = prev_month_date.getDay();
		}

	}
})(jQuery);
