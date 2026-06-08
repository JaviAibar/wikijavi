# Generar un certificado

Pon en DnsName la IP. Es MUY importante porque solo funcionará en dicha IP

```powershell
New-SelfSignedCertificate `
    -DnsName "192.168.192.50", "GROCY-PC" `
    -CertStoreLocation "Cert:\LocalMachine\My" `
    -KeyAlgorithm RSA `
    -KeyLength 2048 `
    -NotAfter (Get-Date).AddMonths(24)
``` 

# Exportar

Presiona `Win + R`, escribe `certlm.msc`

Ve a `Certificados - Equipo local > Personal > Certificados`

Haz clic derecho **"Todas las tareas" > "Exportar..."**.

Sigue el asistente y **exporta la clave privada** (Sí, exportar la clave privada). Elige el formato **`.pfx`** y establece una contraseña.

En el último paso del asistente, también tendrás la opción de **"Exportar el certificado en formato .CER"** para obtener el certificado público por separado.

# Extrae la clave privada (se te pedirá la contraseña del .pfx)

```powershell 
openssl pkcs12 -in tu_certificado.pfx -nocerts -out privkey.pem -nodes
``` 

# Extrae el certificado público

```powershell 
openssl pkcs12 -in tu_certificado.pfx -nokeys -out fullchain.pem
``` 

```powershell 
openssl pkcs12 -in "C:\ruta\a\tu_certificado.pfx" -nocerts -out "C:\grocy_data\keys\cert.key" -nodes
``` 

```powershell 
openssl pkcs12 -in "C:\ruta\a\tu_certificado.pfx" -nokeys -out "C:\grocy_data\keys\cert.crt"
``` 