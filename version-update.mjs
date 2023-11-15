import fs from 'fs';
import chalk from 'chalk';
import prompts from 'prompts';
import packageJson from './package.json' assert { type: 'json' };
import path from 'path';
const argc = process.argv[2];


function writePackageJson() {
  fs.writeFile('./package.json', JSON.stringify(packageJson, null, 2), function (err) {
    if (err) {
      console.log('Error actualizando el archivo', err);
      process.exit(1);
    }
    process.exit(0);
  });
}



async function updateVersion() {
  const preversion = packageJson.version.split('-');
  const version = preversion[0].split('.');
  const [p, n, m] = version;

  if (version.length !== 3) {
    console.log('Incorrect version format', err);
    process.exit(1);
  }

  let currentVersion = version.join('.');
  if (preversion[1]) {
    currentVersion += `-${preversion[1]}`;
  }
  const patch = `${p}.${n}.${chalk.bold.yellowBright(+m + 1)}`;
  const minor = `${p}.${chalk.bold.yellowBright(+n + 1)}.0`;
  const major = `${chalk.bold.yellowBright(+p + 1)}.0.0`;

  const preUpdate = `^${p}.${n}.${m}-${chalk.bold.yellowBright(+preversion[1] + 1 || 0)}`;

  const question = [
    {
      type: 'select',
      name: 'version',
      message: `Select the version to upload. (Current: ${currentVersion})`,
      choices: [
        {
          title: `Patch: ${patch}`,
          value: 'patch',
        },
        {
          title: `Minor: ${minor}`,
          value: 'minor',
        },
        {
          title: `Major: ${major}`,
          value: 'major',
        },
        {
          title: `Preupdate ${preUpdate}`,
          value: 'preupdate',
        },
      ],
    },
  ];

  (async () => {
    const response = await prompts(question);

    if (!response.version) {
      console.log(chalk.red.bold('No option selected'));
      process.exit(1);
    }

    analizeResponse(response);
    updatePackageJsonVersion();
    writePackageJson();
  })();
  const analizeResponse = (response) => {
    switch (response.version) {
      case 'patch':
        version[2] = `${+m + 1}`;
        preversion[1] = undefined;
        break;
      case 'minor':
        version[1] = `${+n + 1}`;
        version[2] = 0;
        preversion[1] = undefined;
        break;
      case 'major':
        version[0] = `${+p + 1}`;
        version[2] = '0';
        version[3] = '0';
        preversion[1] = undefined;
        break;
      case 'preupdate':
        if (preversion[1]) {
          preversion[1] = +preversion[1] + 1;
        } else {
          preversion[1] = '0';
        }
        break;
    }
  }
  const updatePackageJsonVersion = () => {
    packageJson.version = version.join('.');
    if (preversion[1]) {
      packageJson.version += `-${preversion[1]}`;
    }
  }
}
function upgradeVersion() {
  fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file package.json: ${err}`);
      return;
    }

    const version = JSON.parse(data).version;
    if (!version) {
      console.error('Version not found in file package.json');
      return;
    }

    const versionPath = path.join('public', 'version.json');
    fs.writeFile(versionPath, JSON.stringify({ version }), 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to file ${versionPath}: ${err}`);
        return;
      }

      console.log(`Version ${version} has been saved to ${versionPath}`);
    });
  });
}
if (argc === 'update') {
  updateVersion();
} else if (argc === 'updgrade') {
  upgradeVersion();
} else {
  console.log('argument error');
}
