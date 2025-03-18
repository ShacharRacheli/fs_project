﻿using Amazon.S3;
using Amazon.S3.Model;
using Comp.Core.IServices;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Service.Services
{
    public class S3Service:IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IConfiguration configuration)
        {
            var awsOptions = configuration.GetSection("AWS");
            //var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
            var accessKey = awsOptions["AccessKey"];
            //var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_KEY");
            var secretKey = awsOptions["SecretKey"];
            //var region = Environment.GetEnvironmentVariable("AWS_REGION");
            var region = awsOptions["Region"];
            //_bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");
            _bucketName = awsOptions["BucketName"];
            //_bucketName = "racheli-project";
            //Console.WriteLine($"AWS_ACCESS_KEY: {Environment.GetEnvironmentVariable("AWS_ACCESS_KEY")}");
            //Console.WriteLine($"AWS_SECRET_KEY: {Environment.GetEnvironmentVariable("AWS_SECRET_KEY")}");
            //Console.WriteLine($"AWS_REGION: {Environment.GetEnvironmentVariable("AWS_REGION")}");

            _s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        }
        ///==================================
        public async Task<string> GetPresignedUrlAsync(string fileName, string contentType)
        {

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(60),
                ContentType = contentType,
            };
            var url= _s3Client.GetPreSignedURL(request);
            return url;
        }
        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30) // תוקף של 30 דקות
            };

            return _s3Client.GetPreSignedURL(request);
        }
        ///=========================



        public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
        {
            var request = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                InputStream = fileStream,
                ContentType = "image/jpeg" // או ContentType אחר בהתאם
            };
            var response = await _s3Client.PutObjectAsync(request);
            return $"https://{_bucketName}.s3.{_s3Client.Config.RegionEndpoint.SystemName}.amazonaws.com/{fileName}";
        }


        public async Task<Stream> DownloadFileAsync(string fileName)
        {
            var request = new GetObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            var response = await _s3Client.GetObjectAsync(request);
            return response.ResponseStream;
        }
        public async Task DeleteFileAsync(string fileUrl)
        {
            // מחלץ את שם הקובץ מתוך ה-URL
            var fileName = fileUrl.Split('/').Last();

            var request = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            await _s3Client.DeleteObjectAsync(request);
        }
    }
}
