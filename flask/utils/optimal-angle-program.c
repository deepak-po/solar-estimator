// compile with gcc optimal-angle-program.c spa.c -o DESIRE_EXECUTABLE_FILE_NAME -lm  
// run executable with ./DESIRE_EXECUTABLE_FILE_NAME in shell (bash/zsc/cygwin)
// enter required inputs and output file will be saved in same directory
// alternivetly can compile with mingw compiler and then exececutable can be run on windows directly
// this script will create an array (in a text file) for optimal panel angle from sunrise to sunset in 10min internval bases on lat/lon/etc 

#include <stdio.h>
#include <math.h>
#include "spa.h" //include the SPA header file

#define PI 3.1415926535897932384626433832795028841971
#define panelwidth 3.21            //meter //3.21
#define panelspacing 7.5           //meters  //7.5m
#define rowslope 0.381966204729025 //degrees (tracker block drop)--> =DEGREES(ATAN((block_rise=0.75m)/(block_run=112.5m)))

int main(int argc, char *argv[]) {

  int hours = 19;
  int mins = 50;
  int year; //--> time variabels for use in spa function
  int month;
  int day;
  int numDays;
  int maxDay; //<-- time variabels for use in spa function

  printf("Enter a year: "); //--> user input for data range
  scanf("%d", &year);
  printf("Enter a month: ");
  scanf("%d", &month);
  printf("Enter a day: ");
  scanf("%d", &day);
  printf("Enter days of data needed: ");
  scanf("%d", &numDays); //<-- user input for data range

  FILE *fp; //--> create file and add title
  char *filetype = ".txt";
  char filename[50];
  sprintf(filename, "%04d %02d %02d%s", year, month, day, filetype);
  fp = fopen(filename, "w"); 
  fprintf(fp, "static const PROGMEM int trackerposition[");
  fprintf(fp, "%d", numDays);
  fprintf(fp, "][78] = {\n"); //<-- create file and add title

  for (int iyear = year, inumDays = 1; iyear < year + 5 && inumDays <= numDays; iyear++) { //loop thru years

    for (int imonth = month; imonth <= 12 && inumDays <= numDays; imonth++) { //loop thru months

      if (imonth == 1 || imonth == 3 || imonth == 5 || imonth == 7 || imonth == 8 || imonth == 10 || imonth == 12) {
        maxDay = 31;
      } //--> handelling number of days in the months

      else if (imonth == 4 || imonth == 6 || imonth == 9 || imonth == 11) {
        maxDay = 30;
      }

      else if ((imonth == 2) && ((iyear % 400 == 0) || ((iyear % 4 == 0) && (iyear % 100 != 0)))) {
        maxDay = 29;
      }

      else if ((imonth == 2) && ((iyear % 400 != 0) || ((iyear % 4 != 0) && (iyear % 100 == 0)))) {
        maxDay = 28;
      }//<-- handelling number of days in the months

      for (int idays = day; idays <= maxDay && inumDays <= numDays; idays++) { // loop thru days
        fprintf(fp, "{");

        for (int ihours = 6; ihours < hours; ihours++) { // loop thru hours

          for (int imins = 0; imins <= mins; imins = imins + 10) { // loop thru mins

            spa_data spa; //declare the SPA structure
            int result;
            spa.year = iyear;
            spa.month = imonth;
            spa.day = idays;
            spa.hour = ihours;
            spa.minute = imins;
            spa.second = 0; // only checking position to the nearest integer minute
            spa.timezone = 5.5; // hours + greenwich time
            spa.delta_ut1 = 0; // from https://www.usno.navy.mil/USNO/earth-orientation
            spa.delta_t = 70; // from https://www.usno.navy.mil/USNO/earth-orientation
            spa.longitude = 76.100740; // from google earth for site location
            spa.latitude = 15.053705; // from google earth for site location
            spa.elevation = 530; // from google earth for site location
            spa.pressure = 954.25; // calculated from elevation
            spa.temperature = 27; // from historical weather data
            spa.slope = 0; // from spa model
            spa.azm_rotation = 0; // from spa model
            spa.atmos_refract = 0.5667; // from spa model
            spa.function = SPA_ZA;
            result = spa_calculate(&spa); // call the SPA calculate function and pass the SPA structure

            if (result == 0) { // check for SPA errors // calculations for tracker position
              double rotation = -(180 / PI) * atan(tan(spa.zenith * PI / 180) * sin(spa.azimuth * PI / 180));
              double backtrackcoeff = panelspacing * sin((PI / 180) * (90 - spa.zenith - rowslope)) / panelwidth;
              double backtrackrotation = 90 - spa.zenith - (180 / PI) * asin(backtrackcoeff);
              double correctedrotation;

              if (spa.zenith > 90) {
                correctedrotation = 0;
              } //if sun is below horizon set tracker flat

              else if (backtrackcoeff < 1 && backtrackrotation < 55 && backtrackrotation > -55 && rotation < 0) {
                correctedrotation = backtrackrotation;
              } // if position is between 55 && -55 and backtracking is need then user backtracking rotation-- for negative rotation angle

              else if (backtrackcoeff < 1 && backtrackrotation < 55 && backtrackrotation > -55 && rotation > 0) {
                correctedrotation = -backtrackrotation;
              } // if position is between 55 && -55 and backtracking is need then user backtracking rotation-- for positive rotation angle

              else if (backtrackcoeff > 1 && rotation < 55 && rotation > -55) {
                correctedrotation = rotation;
              } // if backtracking is not needed then user optimal rotation angle

              else if (backtrackrotation > 55 || rotation > 55) {
                correctedrotation = 55;
              } // if either backtracking or normal rotation is greater than max rotation then set to max rotation

              else if (backtrackrotation < -55 || rotation < -55) {
                correctedrotation = -55;
              } // if either backtracking or normal rotation is less than min rotation then set to max rotation

              else {
                correctedrotation = 0;
              } // set flat-- should never enter this condition

              double inclinevoltage = 0.05 * correctedrotation + 5; // convert angle to voltage
              int inclinebits = round(inclinevoltage / .03);  // convert voltage to bits (refer to controllino analog to digital converter)

              if (imins == 50 && ihours == 18) { // handles the removal of trailing comma for last row entry
                fprintf(fp, "%d ", inclinebits);
              }

              else {
                fprintf(fp, "%d, ", inclinebits); // adds tracker position to file
              }
            }

            else {
              printf("$*$*$*$*$*$*$*$*$*SPA Error Code: %d\n", result);
            } // if spa has an error
          }
        }

        fprintf(fp, "}, //"); // -->
        fprintf(fp, "%04d %02d %02d\n", iyear, imonth, idays); // <-- adds date as comment to file for each rows data
        inumDays = inumDays + 1; // inumDays tracks total days of data and exits programs when it reaches the user inputted max
      }

      day = 1; //restart day count for month loop
    }

    month = 1; //restart month count for year loop
  }

  fprintf(fp, "};");
  fclose(fp);
  return 0;
}