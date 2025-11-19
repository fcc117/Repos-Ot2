import { Component, importProvidersFrom } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ticketnuevo',
  imports: [PrimeImportsModule],
  templateUrl: './ticketnuevo.html',
  styleUrl: './ticketnuevo.css',
  providers: [MessageService],
})
export class Ticketnuevo {
  arrAreaServicio: any[] = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ];

  arrTipoSolicitud: any[] = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ];

  arrUnidadNegocio: any[] = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ];

  arrIncidente: any[] = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ];
  arrEquipo: any[] = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ];
  selectedArea: any = null;
  selectedSolicitud: any = null;
  selectedUdn: any = null;
  selectedIncidente: any = null;
  selectedEquipo: any = null;

  radioValue: any = null;
  checkboxValue: any = null;
  text: string = `
<p>&nbsp;<em>Para atender tu solicitud requiero de la siguiente información:</em></p>
</br>
<p><span style="color:#FF9900"><strong><em>DATOS GENERALES</em></strong></span></p>
<ul>
  <li><em>Número de empleado:</em></li>
  <li><em>Numero y Nombre de CeCo:</em></li>
  <li><em>Extensión<span style="color:#FF3300">*</span>:</em></li>
  <li><em>Puesto:</em></li>
  <li><em>Justificación:</em></li>
</ul>
<hr />
</br>
<p><strong><em><span style="color:rgb(255, 51, 0)">*Campos Obligatorios</span></em></strong>&nbsp;</p>
`;

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  onBasicUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }
}
