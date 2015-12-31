LOAD DATA INFILE '~/Desktop/HR/gameOfThrones/testData/characterData.txt'
INTO TABLE characters
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '~/Desktop/HR/gameOfThrones/testData/eventData.txt'
INTO TABLE events
ENCLOSED BY '"'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;