<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>Login page</title>
<script>
if(parent && parent!=this) {
	top.location.href = location.pathname;
} else {
// 	console.log("부모창 없음");
}
$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title='Styled DataTable';
	// DataTable initialisation
	$('#example').DataTable(
		{
			"dom": '',
			"paging": false,
			"autoWidth": true,
			"buttons": [
				{
            extend: 'excelHtml5',
            text: 'Styled Excel',
           /*  customize: function( xlsx ) {
            	var new_style = '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="https://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><fonts count="1" x14ac:knownFonts="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border></border></borders><cellStyleXfs count="2"><xf/><xf/></cellStyleXfs><cellXfs count="1"><xf numFmtId="1" fontId="0"></xf><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/><xf/></cellXfs><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/><extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="https://schemas.microsoft.com/office/spreadsheetml/2009/9/main"><x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext></extLst></styleSheet>';
            									xlsx.xl['styles.xml'] = $.parseXML(new_style);
            	                var sheet = xlsx.xl.worksheets['sheet1.xml'];
            					//Apply a style to the header columns
            	                $('row:first c', sheet).attr('s','1');
            									//Apply a style to the header columns
            									//Individual example cells styling
            									
            	            }
			, */
            customize: function( xlsx ) {
			
                var sheet = xlsx.xl['styles.xml'];
				var tagName = sheet.getElementsByTagName('sz');
				for (i = 0; i < tagName.length; i++) {
				  tagName[i].setAttribute("val", "10")
				  
				}
				debugger;
				sheet.getElementsByTagName("font")[0].getElementsByTagName("name")[0].getAttribute("val");
				
				var tagNameFonts = sheet.getElementsByTagName("font");
				for (i = 0; i < tagNameFonts.length; i++) {
					tagNameFonts[i].getElementsByTagName("name")[0].setAttribute("val", "맑은고딕");
				  
				}
				
				
				//Apply a style to the header columns
                // $('row:first c', sheet).attr('s','1');
								//Apply a style to the header columns
								//Individual example cells styling
								
            }
        }
			]
		}
	);
	
	$('.btn-success').on('click',function(){
		var table = $('#example').DataTable();
 		table.button( '0' ).trigger();
	});
});
</script>
</head>
<body class="hold-transition login-page">
		<div class="bg-success">
				<button class="btn btn-success">Styled Excel</button>
				<span class="bt-text">Click button to replace the built-in cell styles with a new stylesheet, and export the table to Excel.</span>
			</div>
			<table id="example" class="table table-bordered" cellspacing="0" width="90%">
				<thead>
					<tr>
						<th>Style Number</th>
						<th>Description</th>
						<th>Detail</th>
						<th>Example<br/>(If possible)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Default</td>
						<td>Background white, text black and left aligned.</td>
						<td>Sample text</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Bold text</td>
						<td>Background white, text black and left aligned.</td>
						<td style="font-weight:bold;">Sample text</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Centered</td>
						<td>Background white, text black and centered.</td>
						<td style="text-align:center;">Sample text</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Right</td>
						<td>Background white, text black and right aligned.</td>
						<td style="text-align:right;">Sample text</td>
					</tr>
					<tr>
						<td>5</td>
						<td>Italic</td>
						<td>Background white, text black and left aligned.</td>
						<td style="font-style:italic;">Sample text</td>
					</tr>
					<tr>
						<td>6</td>
						<td>Italic</td>
						<td>Background white, text black and centered.</td>
						<td style="font-style:italic;text-align:center;">Sample text</td>
					</tr>
					<tr>
						<td>7</td>
						<td>Italic</td>
						<td>Background white, text black and right aligned.</td>
						<td style="font-style:italic;text-align:right;">Sample text</td>
					</tr>
					<tr>
						<td>8</td>
						<td>Bordered</td>
						<td>Background white, text black and left aligned.</td>
						<td style="border:1px solid #000;">Sample text</td>
					</tr>
					<tr>
						<td>9</td>
						<td>Bordered</td>
						<td>Background white, text black and centered.</td>
						<td style="border:1px solid #000;text-align:center">Sample text</td>
					</tr>
					<tr>
						<td>10</td>
						<td>Bordered</td>
						<td>Background white, text black and right aligned.</td>
						<td style="border:1px solid #000;text-align:right;">Sample text</td>
					</tr>
					<tr>
						<td>11</td>
						<td>Overflow (Wrapped)</td>
						<td>Background white, text black and wrapped.</td>
						<td style="width:240px; word-wrap:break-word;">Sample text that will wrap when to long. Content will overflow to the next line.</td>
					</tr>
					<tr>
						<td>12</td>
						<td>Bordered Overflow (Wrapped)</td>
						<td>Background white, text black and wrapped.</td>
						<td style="width:240px; word-wrap:break-word;border:1px solid #000;">Sample text that will wrap when to long. Content will overflow to the next line.</td>
					</tr>
					<tr>
						<td>13</td>
						<td>Darkred background</td>
						<td>Darkred background, white text left aligned.</td>
						<td style="background-color:#C00000;color:#fff;">Sample text</td>
					</tr>
					<tr>
						<td>14</td>
						<td>Red background</td>
						<td>Red background, white text left aligned.</td>
						<td style="background-color:#FF0000;color:#fff;">Sample text</td>
					</tr>
					<tr>
						<td>15</td>
						<td>Orange background</td>
						<td>Orange background, black text left aligned.</td>
						<td style="background-color:#FFC000;">Sample text</td>
					</tr>
					
					<tr>
						<td>16</td>
						<td>Yellow background</td>
						<td>Yellow background, black text left aligned.</td>
						<td style="background-color:#FFFF00;">Sample text</td>
					</tr>
					<tr>
						<td>17</td>
						<td>Lightgreen background</td>
						<td>Lightgreen background, black text left aligned.</td>
						<td style="background-color:#92D050;">Sample text</td>
					</tr>
					<tr>
						<td>18</td>
						<td>Cell background</td>
						<td>Blue</td>
						<td>To Do</td>
					</tr>
					<tr>
						<td>19</td>
						<td>Cell background</td>
						<td>Dark Blue</td>
						<td>Done</td>
					</tr>
					<tr>
						<td>20</td>
						<td>Cell background</td>
						<td>Purple</td>
						<td>Planned</td>
					</tr>
					<tr>
						<td>21</td>
						<td>Cell Style</td>
						<td>Good</td>
						<td>To Do</td>
					</tr>
					<tr>
						<td>22</td>
						<td>Cell Style</td>
						<td>Neutral</td>
						<td>Confirmed</td>
					</tr>
					<tr>
						<td>23</td>
						<td>Shopping bag</td>
						<td>Invalid</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>24</td>
						<td>Cell border</td>
						<td>Around cell</td>
						<td>Confirmed</td>
					</tr>
					<tr>
						<td>25</td>
						<td>Cell format</td>
						<td>Percentage integer value</td>
						<td>Planned</td>
					</tr>
					<tr>
						<td>26</td>
						<td>Cell format</td>
						<td>Dollar currency values</td>
						<td>To Do</td>
					</tr>
					<tr>
						<td>27</td>
						<td>Cell format</td>
						<td>Pound currency values</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>28</td>
						<td>Cell format</td>
						<td>Euro currency values</td>
						<td>Confirmed</td>
					</tr>
					<tr>
						<td>29</td>
						<td>Cell format</td>
						<td>Percentage with 1 decimal place</td>
						<td>To Do</td>
					</tr>
					<tr>
						<td>30</td>
						<td>Cell format</td>
						<td>Negative numbers indicated by brackets</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>31</td>
						<td>Cell format</td>
						<td>Negative numbers indicated by brackets - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>32</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>33</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>34</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>35</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>36</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>37</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>38</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>39</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>40</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>41</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>42</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>43</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>44</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>45</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>46</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>47</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>48</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>49</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>50</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>51</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>52</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>53</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>54</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>55</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>56</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>57</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>58</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>59</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>60</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>Offer</td>
					</tr>
					<tr>
						<td>61</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>62</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>63</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>64</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>65</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>66</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>67</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
					<tr>
						<td>68</td>
						<td>Cell format</td>
						<td>Numbers with thousand separators - 2 decimal places</td>
						<td>18-3-2017</td>
					</tr>
				</tbody>
			</table>
	<div class="login-box">
			<div class="bg-success">
					<button class="btn btn-success">Styled Excel</button>
					<span class="bt-text">Click button to replace the built-in cell styles with a new stylesheet, and export the table to Excel.</span>
				</div>
				<table id="example" class="table table-bordered" cellspacing="0" width="90%">
					<thead>
						<tr>
							<th>Style Number</th>
							<th>Description</th>
							<th>Detail</th>
							<th>Example<br/>(If possible)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Default</td>
							<td>Background white, text black and left aligned.</td>
							<td>Sample text</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Bold text</td>
							<td>Background white, text black and left aligned.</td>
							<td style="font-weight:bold;">Sample text</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Centered</td>
							<td>Background white, text black and centered.</td>
							<td style="text-align:center;">Sample text</td>
						</tr>
						<tr>
							<td>4</td>
							<td>Right</td>
							<td>Background white, text black and right aligned.</td>
							<td style="text-align:right;">Sample text</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Italic</td>
							<td>Background white, text black and left aligned.</td>
							<td style="font-style:italic;">Sample text</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Italic</td>
							<td>Background white, text black and centered.</td>
							<td style="font-style:italic;text-align:center;">Sample text</td>
						</tr>
						<tr>
							<td>7</td>
							<td>Italic</td>
							<td>Background white, text black and right aligned.</td>
							<td style="font-style:italic;text-align:right;">Sample text</td>
						</tr>
						<tr>
							<td>8</td>
							<td>Bordered</td>
							<td>Background white, text black and left aligned.</td>
							<td style="border:1px solid #000;">Sample text</td>
						</tr>
						<tr>
							<td>9</td>
							<td>Bordered</td>
							<td>Background white, text black and centered.</td>
							<td style="border:1px solid #000;text-align:center">Sample text</td>
						</tr>
						<tr>
							<td>10</td>
							<td>Bordered</td>
							<td>Background white, text black and right aligned.</td>
							<td style="border:1px solid #000;text-align:right;">Sample text</td>
						</tr>
						<tr>
							<td>11</td>
							<td>Overflow (Wrapped)</td>
							<td>Background white, text black and wrapped.</td>
							<td style="width:240px; word-wrap:break-word;">Sample text that will wrap when to long. Content will overflow to the next line.</td>
						</tr>
						<tr>
							<td>12</td>
							<td>Bordered Overflow (Wrapped)</td>
							<td>Background white, text black and wrapped.</td>
							<td style="width:240px; word-wrap:break-word;border:1px solid #000;">Sample text that will wrap when to long. Content will overflow to the next line.</td>
						</tr>
						<tr>
							<td>13</td>
							<td>Darkred background</td>
							<td>Darkred background, white text left aligned.</td>
							<td style="background-color:#C00000;color:#fff;">Sample text</td>
						</tr>
						<tr>
							<td>14</td>
							<td>Red background</td>
							<td>Red background, white text left aligned.</td>
							<td style="background-color:#FF0000;color:#fff;">Sample text</td>
						</tr>
						<tr>
							<td>15</td>
							<td>Orange background</td>
							<td>Orange background, black text left aligned.</td>
							<td style="background-color:#FFC000;">Sample text</td>
						</tr>
						
						<tr>
							<td>16</td>
							<td>Yellow background</td>
							<td>Yellow background, black text left aligned.</td>
							<td style="background-color:#FFFF00;">Sample text</td>
						</tr>
						<tr>
							<td>17</td>
							<td>Lightgreen background</td>
							<td>Lightgreen background, black text left aligned.</td>
							<td style="background-color:#92D050;">Sample text</td>
						</tr>
						<tr>
							<td>18</td>
							<td>Cell background</td>
							<td>Blue</td>
							<td>To Do</td>
						</tr>
						<tr>
							<td>19</td>
							<td>Cell background</td>
							<td>Dark Blue</td>
							<td>Done</td>
						</tr>
						<tr>
							<td>20</td>
							<td>Cell background</td>
							<td>Purple</td>
							<td>Planned</td>
						</tr>
						<tr>
							<td>21</td>
							<td>Cell Style</td>
							<td>Good</td>
							<td>To Do</td>
						</tr>
						<tr>
							<td>22</td>
							<td>Cell Style</td>
							<td>Neutral</td>
							<td>Confirmed</td>
						</tr>
						<tr>
							<td>23</td>
							<td>Shopping bag</td>
							<td>Invalid</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>24</td>
							<td>Cell border</td>
							<td>Around cell</td>
							<td>Confirmed</td>
						</tr>
						<tr>
							<td>25</td>
							<td>Cell format</td>
							<td>Percentage integer value</td>
							<td>Planned</td>
						</tr>
						<tr>
							<td>26</td>
							<td>Cell format</td>
							<td>Dollar currency values</td>
							<td>To Do</td>
						</tr>
						<tr>
							<td>27</td>
							<td>Cell format</td>
							<td>Pound currency values</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>28</td>
							<td>Cell format</td>
							<td>Euro currency values</td>
							<td>Confirmed</td>
						</tr>
						<tr>
							<td>29</td>
							<td>Cell format</td>
							<td>Percentage with 1 decimal place</td>
							<td>To Do</td>
						</tr>
						<tr>
							<td>30</td>
							<td>Cell format</td>
							<td>Negative numbers indicated by brackets</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>31</td>
							<td>Cell format</td>
							<td>Negative numbers indicated by brackets - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>32</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>33</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>34</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>35</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>36</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>37</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>38</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>39</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>40</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>41</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>42</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>43</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>44</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>45</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>46</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>47</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>48</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>49</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>50</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>51</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>52</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>53</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>54</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>55</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>56</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>57</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>58</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>59</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>60</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>Offer</td>
						</tr>
						<tr>
							<td>61</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>62</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>63</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>64</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>65</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>66</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>67</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
						<tr>
							<td>68</td>
							<td>Cell format</td>
							<td>Numbers with thousand separators - 2 decimal places</td>
							<td>18-3-2017</td>
						</tr>
					</tbody>
				</table>
		<div class="login-logo" style="vertical-align:middle;">
			<b>LBH</b>unet
		</div><!-- /.login-logo -->
		<div class="login-box-body">

			<c:if test="${(param.fail == null) && param.logout == null}">
				<p class="login-box-msg">로그인 정보를 입력하세요.</p>
			</c:if>
			<c:if test="${not empty param.fail}">
				<p class="login-box-msg" style="color:#f56954;">${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</p>
			<c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>
        	</c:if>
			<c:if test="${param.logout != null}">
				<p class="login-box-msg" style="color:#00a65a;">성공적으로 로그아웃 되었습니다.</p>
			</c:if>
			<c:url var="loginUrl" value="/login" />
		<form action="${loginUrl}" method="POST">
			<div class="form-group has-feedback">
				<input type="text" id="username" name="username" class="form-control" placeholder="Enter Account" required="required" >
				<span class="glyphicon glyphicon-user form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
			<input type="password" id="password" name="password" class="form-control" placeholder="Enter Password" required="required">
			<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<div class="row">
<!-- 				<div class="col-md-8"> -->
<!-- 					<div class="checkbox icheck"> -->
<!-- 						<label> -->
<!-- 							<input type="checkbox"> Remember Me -->
<!-- 						</label> -->
<!-- 					</div> -->
<!-- 				</div>/.col -->
				<div class="col-md-12">
					<button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
				</div><!-- /.col -->
			</div>
		</form>
<!--         <a href="#">I forgot my password</a><br> -->
<!--         <a href="register.html" class="text-center">Register a new membership</a> -->
      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->
</body>
</html>
