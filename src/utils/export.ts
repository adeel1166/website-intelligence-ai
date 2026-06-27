import { WebsiteAnalysis } from '@/types/analysis';

export function exportToJSON(analysis: WebsiteAnalysis): void {
  try {
    const dataStr = JSON.stringify(analysis, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wia-report-${analysis.domain}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export to JSON:', error);
  }
}

export async function exportToPDF(analysis: WebsiteAnalysis): Promise<void> {
  const element = document.getElementById('report-content');
  if (!element) {
    window.print();
    return;
  }

  try {
    // Dynamic import to keep bundle smaller on initial load
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    // Create a temporary loading overlay or indicate to user
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Render HTML element to canvas
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0A0A0F' : '#FAFAFA',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pdfWidth - 20; // 10mm margin on left/right
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // 10mm top margin

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight - 20;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight - 20;
    }

    pdf.save(`wia-report-${analysis.domain}.pdf`);
  } catch (error) {
    console.warn('PDF export failed, falling back to print:', error);
    window.print();
  }
}

export async function copyToClipboard(analysis: WebsiteAnalysis): Promise<boolean> {
  try {
    const text = `
WEBSITE INTELLIGENCE REPORT: ${analysis.executiveSummary.websiteName} (${analysis.domain})
Analyzed At: ${new Date(analysis.analyzedAt).toLocaleString()}
Overall Health Score: ${analysis.healthScore.overall}/100

EXECUTIVE SUMMARY
-----------------
Description: ${analysis.executiveSummary.description}
Category/Industry: ${analysis.executiveSummary.category} / ${analysis.executiveSummary.industry}
Target Audience: ${analysis.executiveSummary.targetAudience}
Market Position: ${analysis.executiveSummary.marketPosition}

BUSINESS MODEL
--------------
Primary Revenue Source: ${analysis.businessModel.primaryRevenue.name} (${analysis.businessModel.primaryRevenue.confidence}% confidence)
Pricing Strategy: ${analysis.businessModel.pricingStrategy}
Acquisition Channels: ${analysis.businessModel.acquisitionChannels.join(', ')}

HEALTH BREAKDOWN
----------------
- Design: ${analysis.healthScore.design.score}/100
- Trust: ${analysis.healthScore.trust.score}/100
- Conversion: ${analysis.healthScore.conversion.score}/100
- SEO: ${analysis.healthScore.seo.score}/100
- Performance: ${analysis.healthScore.performance.score}/100
- Accessibility: ${analysis.healthScore.accessibility.score}/100

AI INSIGHTS SUMMARY
-------------------
${analysis.aiInsights.map((insight) => `- [${insight.category.toUpperCase()}] ${insight.text}`).join('\n')}

For full details, view this report on Website Intelligence AI.
    `.trim();

    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

export function printReport(): void {
  window.print();
}

export function generateShareLink(url: string): string {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?url=${encodeURIComponent(url)}`;
}
