```sql
SELECT count(*), concat(rango, " - ", (rango + 9)) AS Rango

FROM (

 SELECT FLOOR(number / 10) * 10 AS rango

        FROM table

) AS t

GROUP BY rango
```