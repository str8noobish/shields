'use strict'

const { ServiceTester } = require('../tester')
const { isIntegerPercentage } = require('../test-validators')

const t = new ServiceTester({ id: 'sonar', title: 'SonarQube' })
module.exports = t

t.create('Tech Debt')
  .get(
    '/http/sonar.petalslink.com/org.ow2.petals%3Apetals-se-ase/tech_debt.json'
  )
  .expectBadge({
    label: 'tech debt',
    message: isIntegerPercentage,
  })

t.create('Coverage')
  .get(
    '/http/sonar.petalslink.com/org.ow2.petals%3Apetals-se-ase/coverage.json'
  )
  .expectBadge({
    label: 'coverage',
    message: isIntegerPercentage,
  })

t.create('Tech Debt (legacy API supported)')
  .get(
    '/4.2/http/sonar.petalslink.com/org.ow2.petals%3Apetals-se-ase/tech_debt.json'
  )
  .expectBadge({
    label: 'tech debt',
    message: isIntegerPercentage,
  })

t.create('Coverage (legacy API supported)')
  .get(
    '/4.2/http/sonar.petalslink.com/org.ow2.petals%3Apetals-se-ase/coverage.json'
  )
  .expectBadge({
    label: 'coverage',
    message: isIntegerPercentage,
  })

t.create('Tech Debt (legacy API unsupported)')
  .timeout(15000)
  .get(
    '/4.2/https/sonarqube.com/com.github.dannil:scb-java-client/tech_debt.json'
  )
  .expectBadge({ label: 'tech debt', message: 'invalid' })

t.create('Coverage (legacy API unsupported)')
  .get(
    '/4.2/https/sonarqube.com/com.github.dannil:scb-java-client/coverage.json'
  )
  .expectBadge({ label: 'coverage', message: 'invalid' })
