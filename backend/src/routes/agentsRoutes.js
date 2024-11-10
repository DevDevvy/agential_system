// src/routes/agentsRoutes.js
const express = require('express');
const router = express.Router();
const conversationalController = require('../controllers/conversationalController');
const architectureController = require('../controllers/architectureController');
const featureController = require('../controllers/featureController');
const databaseController = require('../controllers/databaseController');
const testingController = require('../controllers/testingController');
const qualityController = require('../controllers/qualityController');
const securityController = require('../controllers/securityController');
const deploymentController = require('../controllers/deploymentController');
const environmentSetupController = require('../controllers/environmentSetupController');
const apiIntegrationController = require('../controllers/apiIntegrationController');

// Conversational Agent Route
router.post('/agents/conversation', conversationalController.handleUserMessage);

// Feature Development Agent Routes
router.post('/agents/feature/frontend', featureController.startFrontendDevelopment);
router.post('/agents/feature/backend', featureController.startBackendDevelopment);
router.post('/agents/feature/database', databaseController.configureDatabase);
router.post('/agents/feature/api', apiIntegrationController.integrateAPIs);

// Architect Agent Routes
router.post('/agents/architecture/design', architectureController.designArchitecture);
router.get('/agents/architecture/status', architectureController.getArchitectureStatus);

// Testing Agent Routes
router.post('/agents/testing/run', testingController.runTests);
router.get('/agents/testing/results', testingController.getTestResults);

// Quality Agent Routes
router.post('/agents/quality/check', qualityController.checkCodeQuality);
router.get('/agents/quality/results', qualityController.getQualityResults);

// Security Agent Routes
router.post('/agents/security/scan', securityController.runSecurityScan);
router.get('/agents/security/results', securityController.getSecurityResults);

// Environment Setup Agent Route
router.post('/agents/environment/setup', environmentSetupController.setupEnvironment);

// Deployment Agent Routes
router.post('/agents/deployment/containerize', deploymentController.containerizeApplication);
router.post('/agents/deployment/deploy', deploymentController.deployApplication);
router.get('/agents/deployment/status', deploymentController.getDeploymentStatus);

module.exports = router;

