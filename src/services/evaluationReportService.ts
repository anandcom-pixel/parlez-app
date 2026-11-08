import type { EvaluationReport, EvaluationCategory, EvaluationSeverity } from '../types/auth';

const EVALUATION_REPORTS_KEY = 'parlez_evaluation_reports_v1';
export const ROUTE_DESTINATION_EMAIL = 'anand.com@gmail.com';

class EvaluationReportService {
  private reports: EvaluationReport[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadReports();
  }

  private loadReports() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(EVALUATION_REPORTS_KEY);
      if (stored) {
        this.reports = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse evaluation reports:', e);
    }
  }

  private saveReports() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(EVALUATION_REPORTS_KEY, JSON.stringify(this.reports));
    this.notify();
  }

  public getReports(): EvaluationReport[] {
    return this.reports;
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public createReport(data: {
    testerUsername: string;
    testerDisplayName: string;
    category: EvaluationCategory;
    activeModule: string;
    severity: EvaluationSeverity;
    title: string;
    description: string;
    stepsToReproduce?: string;
    expectedBehavior?: string;
    actualBehavior?: string;
  }): { report: EvaluationReport; mailtoUrl: string; formattedText: string } {
    const report: EvaluationReport = {
      id: `report-${Date.now()}`,
      timestamp: new Date().toISOString(),
      testerUsername: data.testerUsername,
      testerDisplayName: data.testerDisplayName,
      routeDestination: ROUTE_DESTINATION_EMAIL,
      category: data.category,
      activeModule: data.activeModule,
      severity: data.severity,
      title: data.title.trim(),
      description: data.description.trim(),
      stepsToReproduce: data.stepsToReproduce?.trim(),
      expectedBehavior: data.expectedBehavior?.trim(),
      actualBehavior: data.actualBehavior?.trim(),
      systemInfo: typeof navigator !== 'undefined' ? `${navigator.userAgent} (${window.innerWidth}x${window.innerHeight})` : 'N/A'
    };

    this.reports.unshift(report);
    this.saveReports();

    const formattedText = this.formatReportAsText(report);
    const mailtoUrl = this.generateMailtoUrl(report, formattedText);

    return { report, mailtoUrl, formattedText };
  }

  public formatReportAsText(report: EvaluationReport): string {
    return `=====================================================
PARLEZ APP - TESTER EVALUATION & BUG REPORT
=====================================================
Destination Route: ${report.routeDestination}
Tester: ${report.testerDisplayName} (@${report.testerUsername})
Timestamp: ${new Date(report.timestamp).toLocaleString()}
Active Module: ${report.activeModule}
Category: ${report.category.toUpperCase()}
Severity: ${report.severity.toUpperCase()}

TITLE:
${report.title}

FINDINGS / DESCRIPTION:
${report.description}

STEPS TO REPRODUCE:
${report.stepsToReproduce || 'N/A'}

EXPECTED BEHAVIOR:
${report.expectedBehavior || 'N/A'}

ACTUAL BEHAVIOR:
${report.actualBehavior || 'N/A'}

SYSTEM DIAGNOSTICS:
${report.systemInfo}
=====================================================`;
  }

  public generateMailtoUrl(report: EvaluationReport, bodyText: string): string {
    const subject = encodeURIComponent(`[ParlezApp Evaluation] [${report.severity.toUpperCase()}] ${report.title} (${report.category})`);
    const body = encodeURIComponent(bodyText);
    return `mailto:${ROUTE_DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
  }

  public copyToClipboard(text: string): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
    }
    return Promise.resolve(false);
  }
}

export const evaluationReportService = new EvaluationReportService();
