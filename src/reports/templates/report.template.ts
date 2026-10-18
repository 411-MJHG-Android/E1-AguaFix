import { CreateReportDto } from "../dto/report.dto";

export const generateReportTemplate = (dto: CreateReportDto, photoUrl: string): string => {
  const severityColors: Record<string, string> = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545',
  };

  const badgeColor = severityColors[dto.severity] || '#6c757d';

  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 25px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <div style="background-color: #0056b3; padding: 18px 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px;">Aviso de Fuga de Agua Reportada</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #d0e2ff;">Atención inmediata requerida</p>
        </div>
        <div style="padding: 24px;">
          
          <!-- ETIQUETA DE IMAGEN AGREGADA AQUÍ -->
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${photoUrl}" alt="Evidencia de la fuga" style="max-width: 100%; max-height: 300px; border-radius: 8px; border: 1px solid #dee2e6;" />
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333333;">
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 10px 0; font-weight: bold; width: 35%;">Dirección:</td>
              <td style="padding: 10px 0;">${dto.address}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 10px 0; font-weight: bold;">Descripción:</td>
              <td style="padding: 10px 0;">${dto.description}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e9ecef;">
              <td style="padding: 10px 0; font-weight: bold;">Severidad:</td>
              <td style="padding: 10px 0;">
                <span style="background-color: ${badgeColor}; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 12px;">
                  ${dto.severity}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Teléfono:</td>
              <td style="padding: 10px 0;">${dto.reporterPhone}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `;
};