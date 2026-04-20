import { useState } from "react";
import { Award, Trophy, Filter, ExternalLink, Loader2 } from "lucide-react";
import { useCredentials } from "@/hooks/useCredentials";
import { useInView } from "@/hooks/useInView";

const CertificatesSection = () => {
  const [activeTab, setActiveTab] = useState<"certs" | "comps">("certs");
  const [filter, setFilter] = useState("All");
  const { ref: headingRef, isInView: headingInView } = useInView();
  const { ref: contentRef, isInView: contentInView } = useInView();

  const { data: certificates = [], isLoading: loadingCerts } = useCredentials("certificate");
  const { data: competitions = [], isLoading: loadingComps } = useCredentials("competition");

  const isLoading = loadingCerts || loadingComps;

  const certCategories = ["All", ...new Set(certificates.map((c) => c.category).filter(Boolean))];
  const compCategories = ["All", ...new Set(competitions.map((c) => c.category).filter(Boolean))];
  const categories = activeTab === "certs" ? certCategories : compCategories;

  const filteredCerts = filter === "All" ? certificates : certificates.filter((c) => c.category === filter);
  const filteredComps = filter === "All" ? competitions : competitions.filter((c) => c.category === filter);

  return (
    <section id="certificates" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headingRef}
          className="text-center mb-12"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Achievements</span>
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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div
            ref={contentRef}
            className="glass-card overflow-hidden"
            style={{
              opacity: contentInView ? 1 : 0,
              transform: contentInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    {activeTab === "certs" ? (
                      <>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Certificate</th>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Issuer</th>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Link</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Competition</th>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Result</th>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-left px-6 py-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Link</th>
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
                          <td className="px-6 py-4">
                            {cert.link && (
                              <a href={cert.link} target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </td>
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
                          <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">{comp.result}</td>
                          <td className="px-6 py-4 font-mono text-sm text-muted-foreground">{comp.date}</td>
                          <td className="px-6 py-4">
                            {comp.link && (
                              <a href={comp.link} target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {(activeTab === "certs" ? filteredCerts : filteredComps).length === 0 && (
                <div className="text-center py-12">
                  <p className="font-mono text-sm text-muted-foreground">No entries found.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;
