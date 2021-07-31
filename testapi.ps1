$api = 'https://mongo-node-api.azurewebsites.net'
$api = 'http://localhost:8080'
$api = 'http://localhost:3000'
Write-Output ($api + '/auth/login')
# Check connection
Write-Output (Invoke-RestMethod -Uri ( $api + '/health' ) -Method GET)
# Login
$res = Invoke-RestMethod `
  -Uri ( $api + '/auth/login' )`
  -Method POST `
  -Headers @{ `
    'attr-application' = 'Angular01' `
  } `
  -body @{ `
    'username'= 'vunn6'; `
    'password'= 'password@1' `
  }
Write-Output $res.data.token;
# Get All User
Write-Output (Invoke-RestMethod `
  -Uri ($api + '/api/users?' + 'fullname=ct ng') `
  -Method GET `
  -Headers @{ `
    'authorization' = 'bearer ' + $res.data.token
  }).data
# Get VuNN5
Write-Output (Invoke-RestMethod `
  -Uri ($api + '/api/users/5fe9a3e33454883b48f5fee3') `
  -Method GET `
  -Headers @{ `
    'attr-application' = 'Angular01'; `
    'authorization' = 'bearer ' + $res.data.token
  }).data
# Add VuNN5
Write-Output (Invoke-RestMethod `
  -Uri ($api + '/api/users') `
  -Method POST `
  -Headers @{ `
    'attr-application' = 'Angular01'; `
    'authorization' = 'bearer ' + $res.data.token
  } `
  -Body @{ `
    'username' = 'vunn5';
    'password' = '123456'
  })
# Delete VuNN5
Write-Output (Invoke-RestMethod `
  -Uri ($api + '/api/users?id=5fb765e518850953f4f67cf5') `
  -Method DELETE `
  -Headers @{ `
    'attr-application' = 'Angular01'; `
    'authorization' = ('bearer ' + $res.data.token)
  })
# Update VuNN5
Write-Output (Invoke-RestMethod `
  -Uri ($api + '/api/users/5fb7638bdac78a469082c6e6') `
  -Method Put `
  -Headers @{ `
    'attr-application' = 'Angular01'; `
    'authorization' = 'bearer ' + $res.data.token
  } `
  -ContentType 'application/json' `
  -Body (@{ `
    'username' = 'vunn5'; `
    'fullname' = 'Nguyen Ngoc Vu 2';
  } | ConvertTo-Json))
