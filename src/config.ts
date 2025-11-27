export const _config = {
  baseUrl: 'http://localhost:8000/ApiGateway',
  cierreSesion: 'Cierre de sesión',
  cierresesionexistente: 'Cierre de sesión existente',
  plantillaInfra: `
<p><strong>Requerimiento:</strong></p>
<p>[Descripción]</p>
</br>
<p><strong>Ejecutar:</strong></p>
<p>[nombre archivos o link de publicación]</p>
</br>
<p><strong>Plan de retorno:</strong></p>
<p>[nombre archivos]</p>
</br>
<p><strong>Checklist:</strong></p>
<p><strong>a) ¿Cúal es el objetivo de la actividad solicitada?</strong></p>
<p>[Respuesta]</p>
<p><strong>b) ¿Qúe pruebas se realizaron para verificar que la tarea solicitada tendrá el efecto esperado?</strong></p>
<p>[Respuesta]</p>
<p><strong>c) ¿Quién dio el VoBo a los resultados de estas pruebas?</strong></p>
<p>[Respuesta]</p>
<p><strong>d) ¿Cuál es el impacto de no atender la solicitud?</strong></p>
<p>[Respuesta]</p>
`,
  plantillaDefault: `

<p style="text-align:center"><u><strong><em>Informaci&oacute;n de Ticket - Soporte</em></strong></u></p>
</br>
<p><em><strong>Para dar seguimiento favor de llenar los siguientes datos:</strong></em></p>

<ul>
	<li><em>Quien Atiende:</em></li>
	<li><em>Quien Reporta:</em></li>
</ul>
</br>
<p><em><strong>Medio de reporte (Llamada,Correo, Teams,etc):</strong></em></p>

<ul>
	<li><em>&nbsp; &nbsp; &nbsp;<span style="color:rgb(255, 153, 0)">(especifique)</span></em></li>
</ul>
</br>
<p><strong><em>Justificaci&oacute;n:</em></strong></p>

<ul>
	<li><em>(especifique)</em></li>
</ul>

<p>&nbsp;</p>

`,
};
