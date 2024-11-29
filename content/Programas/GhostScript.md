
El comando es

```shell
gswin64
``` 

opciones que son obligatorios (ya, contradictorio 🤷‍♂️)

```shell
-sOutputFile=output.pdf -sDEVICE=pdfwrite
``` 

comando que sugirió ChatGPT para girar un conjunto de páginas

```shell
 gswin64 -o output.pdf -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -c "[ /Page /Rotate 180 /PUT ] << /PageList [ 1 2 3 5 7 ] >> setpagedevice" -f input.pdf
```

o

```shell
gswin64 -o output.pdf -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -c "<</EndPage {2 mod 0 eq {0}{180} setpagedevice} >> setpagedevice" -f input.pdf
```

Sin embargo, no funcionaron, no sé por qué

`-sPageList=`_pagenumber_
parece que puedes seleccionar un conjunto de páginas o poner even u odd
ejemplos
``` 
-sPageList=1,3,5 indicates that pages 1, 3 and 5 should be processed.
-sPageList=5-10 indicates that pages 5, 6, 7, 8, 9 and 10 should be processed.
-sPageList=1,5-10,12- indicates that pages 1, 5, 6, 7, 8, 9, 10 and 12 onwards should be processed.
``` 

# Bibliografía

https://ghostscript.com/docs/9.54.0/Use.htm#PDF_stdin