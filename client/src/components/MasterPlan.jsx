import { PLAN_CATEGORIES } from '../data/masterPlanCategories.js'
import LayoutPlan from './LayoutPlan.jsx'

export default function MasterPlan() {
  return (
    <section className="mplan-section" id="master_plan">
      <div className="container">
        <div className="mplan-head">
          <span className="mplan-eyebrow">The Master Plan</span>
          <h3>Thoughtfully zoned, acre by acre.</h3>
          <p>
            306 Vaastu-compliant villa plots from 1,200 – 2,400 sq.ft, gathered around gardens,
            a clubhouse and open sky across 23.5 master-planned acres.
          </p>
        </div>

        <div className="mplan-body">
          <div className="mplan-graphic">
            <LayoutPlan />
          </div>

          <div className="mplan-legend">
            {PLAN_CATEGORIES.map((c) => (
              <div className="mplan-legend-item" key={c.key}>
                <span className="mplan-legend-dot" style={{ background: c.color }} />
                {c.label}
              </div>
            ))}
          </div>

          <p className="mplan-note">
            Hover or tap the plan to see plot sizes and counts · 23.5 acres · 60 ft arterial avenue with
            30 ft &amp; 40 ft internal streets · integrated retail &amp; commercial zone.
          </p>
        </div>
      </div>
    </section>
  )
}
