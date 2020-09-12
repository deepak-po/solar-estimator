import json
import io
import re

f = io.open('../../react/src/data/global-data.txt', mode="r", encoding="utf-8-sig")
data = json.load(f)

def a(test_str):
    ret = ''
    skip1c = 0
    skip2c = 0
    for i in test_str:
        if i == '[':
            skip1c += 1
        elif i == '(':
            skip2c += 1
        elif i == ']' and skip1c > 0:
            skip1c -= 1
        elif i == ')'and skip2c > 0:
            skip2c -= 1
        elif skip1c == 0 and skip2c == 0:
            ret += i
    return ret

s = set()

c = [
'China',
'Egypt',
'UnitedArabEmirates',
'Mexico',
'UnitedStates',
'Japan',
'Australia',
'SaudiArabia',
'India',
'France',
]



for x in data:

    if x['Location']:
        name = x['Name']

        capacity = str(x['CapacityMWDC or MWAC (*)'])
        capacity = capacity.replace(',', '')
        capacity = capacity.replace('*', '')
        
        output = str(x['Annual OutputGWh'])
        output = output.replace('"', '')
        output = output.replace("'", '')
        output = output.replace(',', '')
        output = output.replace(' ', '')
        output = a(output)
        if not output:
            output = "null"
        country = x['Country']
        user_id = c.index(country.replace(' ', ''))
        # print(country, user_id)
        year = x["Year"]

        area = str(x['LandSizekm²'])
        area = area.replace('?', '')
        area = a(area)
        if not area:
            area = "null"

        lat = (x['Location'].split('/')[1].split()[0][:-2])
        lat = lat.replace('"', '')
        lat = lat.replace("'", '')
        lat = lat.replace(',', '')
        lat = lat.replace(' ', '')
        lat = lat.replace('°', '')
        arr = bytes(lat,'utf-8')
        lat = arr.decode('utf-8-sig').encode('utf-8')

        lng = (x['Location'].split('/')[1].split()[1][:-2])
        lng = lng.replace('"', '')
        lng = lng.replace("'", '')
        lng = lng.replace(',', '')
        lng = lng.replace(' ', '')
        lng = lng.replace('°', '')
        arr = bytes(lat,'utf-8')
        lat = arr.decode('utf-8-sig').encode('utf-8')
        
        # print((
        #   f"({user_id+1},"
        #   f" '{name}', "
        #   f" '{country}', "
        #   f" {area}, "
        #   f" {output}, "
        #   f" {year}, "
        #   f" {lat}, "
        #   f" {lng} "
        #   f"),"
        # ))

        
        
        


# for ele in s:
#   print(f"('{ele.replace(' ', '')}', '{ele.lower().replace(' ', '')}@country.com', 'password')")
# null = "a"
# x = [
# (8, 'Bhadla Solar Park',  'India',  40,  null,  2020,  27.5396694,  71.9152528 ),
# (8, 'Pavagada Solar Park',  'India',  53,  null,  2019,  14.26917,  77.41389 ),
# (1, 'Benban Solar Park',  'Egypt',  37,  null,  2019,  24.456000,  32.739000 ),
# (0, 'Tengger Desert Solar Park',  'China',  43,  null,  2016,  37.55000,  105.05389 ),
# (2, 'Noor Abu Dhabi',  'United Arab Emirates',  8,  null,  2019,  24.40306,  55.26861 ),
# (2, 'Mohammed bin Rashid Al Maktoum Solar Park',  'United Arab Emirates',  null,  null,  2020,  24.75472,  55.36500 ),
# (8, 'Kurnool Ultra Mega Solar Park',  'India',  24,  null,  2017,  15.681522,  78.283749 ),
# (0, 'Datong Solar Power Top Runner Base',  'China',  null,  null,  2016,  40.07361,  113.13667 ),
# (8, 'NP Kunta',  'India',  null,  null,  2020,  14.017,  78.433 ),
# (0, 'Longyangxia Dam Solar Park',  'China',  23,  null,  2015,  36.18167,  100.57806 ),
# (3, 'Villanueva Solar Park',  'Mexico',  27.5,  null,  2018,  25.58472,  103.04500 ),
# (8, 'Rewa Ultra Mega Solar',  'India',  6.4,  null,  2018,  24.48028,  81.57444 ),
# (4, 'Solar Star(I and II)',  'United States',  13,  1664,  2015,  34.83056,  118.39806 ),
# (8, 'Charanka Solar Park',  'India',  20,  null,  2012,  23.900,  71.200 ),
# (8, 'Kamuthi Solar Power Project',  'India',  10.1,  null,  2017,  9.35444,  78.38444 ),
# (4, 'Copper Mountain Solar Facility',  'United States',  16.2,  1291,  2016,  35.783,  114.983 ),
# (4, 'Desert Sunlight Solar Farm',  'United States',  16,  1287,  2015,  33.82583,  115.40222 ),
# (4, 'Topaz Solar Farm',  'United States',  19,  1268,  2014,  35.383,  120.067 ),
# (0, 'Huanghe Hydropower Golmud Solar Park',  'China',  23,  null,  2014,  36.40000,  95.12500 ),
# (4, 'Mount Signal Solar',  'United States',  15.9,  1197,  2018,  32.67333,  115.63972 ),
# (4, 'Mesquite Solar project',  'United States',  9.3,  1140,  2016,  33.333,  112.917 ),
# (8, 'Galiveedu solar park',  'India',  null,  null,  2018,  14.11806,  78.45861 ),
# (8, 'Ananthapuramu - II',  'India',  17,  null,  2019,  14.98028,  78.04583 ),
# (0, 'Yanchi Solar Park',  'China',  null,  525,  2016,  38.1633714,  106.7611986 ),
# (4, 'Springbok Solar Farm',  'United States',  5.7,  717,  2019,  35.25,  117.96 ),
# (6, 'Limondale Solar Farm',  'Australia',  null,  null,  2020,  34.779758,  143.509738 ),
# (9, 'Cestas Solar Park',  'France',  2.5,  380,  2015,  44.72556,  0.81694 ),
# (4, 'Techren Solar Project',  'United States',  9.3,  null,  2019,  35.78333,  115.01667 ),
# (7, 'Sakaka PV IPP',  'Saudi Arabia',  null,  null,  2019,  29.77361,  40.06194 ),
# (4, 'Agua Caliente Solar Project',  'United States',  9.7,  740,  2014,  32.9533,  113.4900 ),
# (4, 'California Flats Solar Project',  'United States',  11.7,  null,  2017,  35.883,  120.400 ),
# (4, 'Great Valley Solar',  'United States',  6.5,  null,  2018,  36.58111,  120.37944 ),
# (4, 'Garland Solar Facility',  'United States',  8.1,  547,  2016,  34.82528,  118.52500 ),
# (4, 'GA Solar 4 Project',  'United States',  8.1,  null,  2019,  32.59861,  83.50139 ),
# (4, 'Tranquillity Solar project',  'United States',  7.7,  455,  2016,  36.61722,  120.38778 ),
# (8, 'Mandsaur Solar Farm',  'India',  null,  null,  2017,  24.08806,  75.79972 ),
# (4, 'McCoy Solar Energy Project',  'United States',  9.3,  745,  2016,  33.71667,  114.75000 ),
# (4, 'Silver State South Solar Project',  'United States',  11.7,  711,  2016,  35.633,  115.350 ),
# (4, 'California Valley Solar Ranch',  'United States',  7.96,  675,  2013,  35.333,  119.917 ),
# (4, 'Stateline Solar',  'United States',  6.82,  658,  2016,  35.58556,  115.43583 ),
# (4, 'Moapa Southern Paiute',  'United States',  8.1,  629,  2016,  36.517,  114.750 ),
# (8, 'Kadapa Ultra Mega Solar Park',  'India',  24,  null,  2020,  14.91639,  78.29194 ),
# (4, 'Escalante Solar Project',  'United States',  7.7,  624,  2016,  38.50083,  113.03000 ),
# (4, 'Midway Solar',  'United States',  6.1,  null,  2019,  30.991045,  102.221373 ),
# (4, 'Blythe Solar Energy Center',  'United States',  8.1,  622,  2016,  33.65000,  114.72000 ),
# (5, 'Setouchi Kirei Mega Solar Power Plant',  'Japan',  2.6,  null,  2018,  34.64667,  134.15389 ),
# (4, 'Upton Solar 2',  'United States',  7.7,  null,  2017,  31.251208,  102.268253 ),
# (4, 'Antelope Valley Solar Ranch',  'United States',  8.5,  614,  2015,  34.767,  118.417 ),
# (6, 'Bungala Solar Power Project',  'Australia',  null,  null,  2018,  32.42,  137.84 ),
# (4, 'Roserock Solar',  'United States',  5.3,  396,  2016,  30.960209,  103.306662 ),
# (4, 'Buckthorn Solar 1',  'United States',  5.1,  null,  2018,  30.575520,  102.551292 ),
# ]

# for ele in x:
#   if len(ele)==8:
#     print(ele[1])
