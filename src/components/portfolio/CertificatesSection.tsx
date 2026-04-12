import { Award, Trophy, Filter } from "lucide-react";
import { useState } from "react";

interface CertItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: string;
  credentialId?: string;
}

interface CompItem {
  id: string;
  name: string;
  rank: string;
  date: string;
  category: string;
  participants?: string;
}

const certificates: CertItem[] = [
  { id: "1", name: "AWS Solutions Architect – Professional", issuer: "Amazon Web Services", date: "2024-01", category: "Cloud", credentialId: "AWS-SAP-2024" },
  { id: "2", name: "TensorFlow Developer Certificate", issuer: "Google", date: "2023-08", category: "AI/ML", credentialId: "TF-DEV-2023" },
  { id: "3", name: "CFA Level II", issuer: "CFA Institute", date: "2023-06", category: "Finance", credentialId: "CFA-L2-2023" },
  { id: "4", name: "Kubernetes Administrator (CKA)", issuer: "CNCF", date: "2023-03", category: "DevOps", credentialId: "CKA-2023" },
  { id: "5", name: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "2022-11", category: "AI/ML", credentialId: "DL-SPEC-22" },
];

const competitions: CompItem[] = [
  { id: "1", name: "Google Code Jam", rank: "#142", date: "2024", category: "Competitive Programming", participants: "30,000+" },
  { id: "2", name: "Kaggle – Stock Prediction Challenge", rank: "Gold Medal", date: "2023", category: "AI/ML", participants: "4,200+" },
  { id: "3", name: "HackMIT", rank: "1st Place", date: "2023", category: "Hackathon", participants: "1,500+" },
  { id: "4", name: "Bloomberg Trading Challenge", rank: "Top 5%", date: "2022", category: "Finance", participants: "8,000+" },
  { id: "5", name: "ICPC Regional", rank: "#23", date: "2022", category: "Competitive Programming", participants: "500+" },
];

const CertificatesSection = () => {
  const [activeTab, setActiveTab] = useState<"certs" | "comps">("certs");
  const [filter, setFilter] = useState("All");

  const certCategories = ["All", ...new Set(certificates.map((c) => c.category))];
  const compCategories = ["All", ...new Set(competitions.map((c) => c.category))];
  const categories = activeTab === "certs" ? certCategories : compCategories;

  const filteredCerts = filter === "All" ? certificates : certificates.filter((c) => c.category === filter);
  const filteredComps = filter === "All" ? competitions : competitions.filter((c) => c.category === filter);

  return (
    <section id="certificates" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-sm text-primary mb-2 block">// verified.credentials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--text-primary))]">
            The <span className="gradient-text">Ledger</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => { setActiveTab("certs"); setFilter("All"); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 ${
              activeTab === "certs"
                ? "bg-primary/10 border border-primary/30 text-primary"
                : "bg-muted/30 border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Award className="h-4 w-4" /> Certificates
          </button>
          <button
            onClick={() => { setActiveTab("comps"); setFilter("All"); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 ${
              activeTab === "comps"
                ? "bg-primary/10 border border-primary/30 text-primary"
                : "bg-muted/30 border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trophy className="h-4 w-4" /> Competitions
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                filter === cat
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-muted/30 text-muted-foreground border border-transparent hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {activeTab === "certs" ? (
                    <>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Certificate</th>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Issuer</th>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">ID</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Competition</th>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Rank</th>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Year</th>
                      <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Participants</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === "certs"
                  ? filteredCerts.map((cert) => (
                      <tr key={cert.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-[hsl(var(--text-primary))]">{cert.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{cert.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/80">{cert.issuer}</td>
                        <td className="px-6 py-4 font-mono text-sm text-muted-foreground">{cert.date}</td>
                        <td className="px-6 py-4 font-mono text-xs text-primary/70">{cert.credentialId}</td>
                      </tr>
                    ))
                  : filteredComps.map((comp) => (
                      <tr key={comp.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-[hsl(var(--text-primary))]">{comp.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{comp.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">{comp.rank}</td>
                        <td className="px-6 py-4 font-mono text-sm text-muted-foreground">{comp.date}</td>
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{comp.participants}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
